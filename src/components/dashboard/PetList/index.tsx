"use client";

import { usePetContext, useSearchContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function PetList() {
  const { pets, selectedPetId, handleChangeSelectedPetId } = usePetContext();
  const { searchQuery } = useSearchContext();

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery)
  );

  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {filteredPets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handleChangeSelectedPetId(pet.id)}
            className={cn(
              "flex h-[70px] cursor-pointer items-center px-4 text-base gap-x-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition w-full",
              { "bg-[#EFF1F2]": selectedPetId === pet.id }
            )}
          >
            <Image
              width={45}
              height={45}
              src={pet.imageUrl}
              alt="pet image"
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
