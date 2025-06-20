"use client";

import React from "react";
import NavLink from "./navlink";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center gap-6 py-3.5 px-6 sm:px-10 md:px-20 border-b border-gray-400/30">
      {/* Logo and Nav Links Grouped Together */}
      <div className="flex items-center gap-3">
        <Link href="/" className="text-3xl font-semibold">
          Colaro
        </Link>

        {/* Separator */}
        <div className="h-6 w-px bg-gray-300" />

        {/* Nav Links just right to the logo */}
        <ul className="flex items-center gap-4 font-medium text-sm md:text-base">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/generate">Generate</NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
