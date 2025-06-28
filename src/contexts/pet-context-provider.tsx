"use client";

import { addPet, checkoutPet, editPet } from "@/actions/actions";
import React, { createContext, useOptimistic, useState } from "react";
import { toast } from "sonner";
import { Pet } from "../../generated/prisma";
import { PetEssentials } from "@/lib/types";

type PetContextProviderProps = {
  data: Pet[];
  children: React.ReactNode;
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: Pet["id"] | null;
  handleChangeSelectedPetId: (id: Pet["id"]) => void;
  selectedPet: Pet | undefined;
  numberOfPets: number;
  handleCheckoutPet: (id: Pet["id"]) => void;
  handleAddPet: (newPet: PetEssentials) => Promise<void>;
  handleEditPet: (id: Pet["id"], newPetData: PetEssentials) => Promise<void>;
};

export const PetContext = createContext<TPetContext | null>(null);

export default function PetContextProvider({
  data,
  children,
}: PetContextProviderProps) {
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    data,
    (state, { action, payload }: { 
      action: string; 
      payload: PetEssentials | { id: string; newPetData: PetEssentials } | string 
    }) => {
      switch (action) {
        case "add":
          return [...state, { ...(payload as PetEssentials), id: Math.random().toString(), createdAt: new Date(), updatedAt: new Date() }];
        case "edit":
          const editPayload = payload as { id: string; newPetData: PetEssentials };
          return state.map((pet) => {
            if (pet.id === editPayload.id) {
              return { ...pet, ...editPayload.newPetData };
            }
            return pet;
          });
        case "checkout":
          return state.filter((pet) => pet.id !== (payload as string));
        default:
          return state;
      }
    }
  );
  const selectedPet = optimisticPets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = optimisticPets.length;

  const handleChangeSelectedPetId = (id: Pet["id"]) => {
    setSelectedPetId(id);
  };

  const handleAddPet = async (newPet: PetEssentials) => {
    setOptimisticPets({ action: "add", payload: newPet });
    const error = await addPet(newPet);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleEditPet = async (petId: Pet["id"], newPetData: PetEssentials) => {
    setOptimisticPets({ action: "edit", payload: { id: petId, newPetData } });
    const error = await editPet(petId, newPetData);
    if (error) {
      toast.warning(error.message);
      return;
    }
  };

  const handleCheckoutPet = async (petId: Pet["id"]) => {
    setOptimisticPets({ action: "checkout", payload: petId });
    await checkoutPet(petId);

    setSelectedPetId(null);
  };

  return (
    <PetContext.Provider
      value={{
        pets: optimisticPets,
        selectedPetId,
        handleChangeSelectedPetId,
        selectedPet,
        numberOfPets,
        handleCheckoutPet,
        handleAddPet,
        handleEditPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
}
