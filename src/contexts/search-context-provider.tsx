"use client";

import React, { createContext, useState } from "react";

export const SearchContext = createContext<TSearchContext | null>(null);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

type TSearchContext = {
  searchQuery: string;
  handleSearchQuery: (newValue: string) => void;
};

export default function SearchContextProvider({
  children,
}: SearchContextProviderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQuery = (newValue: string) => {
    setSearchQuery(newValue);
  };

  return (
    <SearchContext.Provider value={{ handleSearchQuery, searchQuery }}>
      {children}
    </SearchContext.Provider>
  );
}
