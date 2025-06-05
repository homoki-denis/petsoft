"use client";

import { useSearchContext } from "@/lib/hooks";
import React from "react";

export default function SearchForm() {
  const { searchQuery, handleSearchQuery } = useSearchContext();

  return (
    <form className="w-full h-full">
      <input
        className="w-full h-full bg-white/30 px-5 outline-none transition focus:bg-white/50 hover:bg-white/30"
        placeholder="search pets"
        type="search"
        value={searchQuery}
        onChange={(e) => handleSearchQuery(e.target.value)}
      />
    </form>
  );
}
