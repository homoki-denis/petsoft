import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";

export type TPetForm = z.infer<typeof petFormSchema>;

export const petIdSchema = z.string().cuid();

export const petFormSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required" }).max(10),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: "Owner name is required" })
      .max(10),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Image url must be a valid url" }),
    ]),
    age: z.coerce.number().int().positive().max(10),
    notes: z.union([z.literal(""), z.string().trim().max(100)]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }));

export type TUserForm = z.infer<typeof userFormSchema>;

export const userFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
