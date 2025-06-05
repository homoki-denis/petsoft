import { Footer, Header } from "@/components/layout";
import { BackgroundPattern, Toaster } from "@/components/ui";
import PetContextProvider from "@/contexts/pet-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
import { prisma } from "@/lib/db";
import React from "react";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pets = await prisma.pet.findMany();

  return (
    <>
      <BackgroundPattern />

      <div className="max-w-[1050px] flex flex-col mx-auto px-4 xl:px-0 min-h-screen">
        <Header />
        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>
        <Footer />
      </div>

      <Toaster position="top-right" />
    </>
  );
}
