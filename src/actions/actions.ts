"use server";

import { prisma } from "@/lib/db";
import { executeAction, sleep } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { PetEssentials } from "@/lib/types";
import { Pet } from "../../generated/prisma";
import { petFormSchema, petIdSchema, userFormSchema } from "@/lib/validations";
import bcrypt from "bcrypt";

export async function addPet(pet: PetEssentials) {
  await sleep(1000);

  const validatedPet = petFormSchema.safeParse(pet);

  if (!validatedPet.success) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        userId: "temp-user-id", // TODO: Get actual user ID from session
      },
    });
  } catch (error) {
    return { message: "Could not add pet: " + error };
  }

  revalidatePath("/app", "layout");
}

export async function editPet(petId: Pet["id"], newPetData: PetEssentials) {
  await sleep(1000);

  const validatedPetId = petIdSchema.safeParse(petId);

  const validatedPet = petFormSchema.safeParse(newPetData);

  if (!validatedPet.success || !validatedPetId) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPet.data,
    });
  } catch (error) {
    return {
      message: "Could not edit pet: " + error,
    };
  }
  revalidatePath("/app", "layout");
}

export async function checkoutPet(petId: Pet["id"]) {
  await sleep(1000);

  const validatedPetId = petIdSchema.safeParse(petId);

  if (!validatedPetId) {
    return {
      message: "Invalid pet data",
    };
  }

  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (error) {
    return { message: "Could not delete: " + error };
  }
  revalidatePath("/app", "layout");
}

export async function signUp(formData: FormData) {
  console.log("signUp action called");
  return executeAction({
    actionFn: async () => {
      const email = formData.get("email");
      const password = formData.get("password");
      const validatedData = userFormSchema.parse({ email, password });

      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      console.log("Creating user with email:", validatedData.email);
      const user = await prisma.user.create({
        data: {
          email: validatedData.email.toLowerCase(),
          hashedPassword,
        },
      });

      return user;
    },
  });
}
