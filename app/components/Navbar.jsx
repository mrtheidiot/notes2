import Link from "next/link";

import React from "react";

const Navbar = () => {
  return (
    <nav className="flex content-center pb-3 w-full m-auto border-solid border-b-2 space-x-4">
      <Link
        className="relative overflow-hidden bg-black text-white py-2 px-6 rounded-full shadow-lg transform transition-all ease-out duration-500 hover:scale-110 group"
        href="/dailynotes"
      >
        <span className="absolute inset-0 bg-slate-600 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
        <span className="relative">Daily Notes</span>
      </Link>
      <Link
        href="/notes"
        className="relative overflow-hidden bg-black text-white py-2 px-6 rounded-full shadow-lg transform transition-all ease-out duration-500 hover:scale-110 group"
      >
        <span className="absolute inset-0 bg-slate-600 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
        <span className="relative">All Notes</span>
      </Link>
      <Link
        href="/notes/add"
        className="relative overflow-hidden bg-black text-white py-2 px-6 rounded-full shadow-lg transform transition-all ease-out duration-500 hover:scale-110 group"
      >
        <span className="absolute inset-0 bg-slate-600 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100"></span>
        <span className="relative"> Add New Note</span>
      </Link>
    </nav>
  );
};

export default Navbar;

// className="relative overflow-hidden bg-black text-white py-2 px-6 rounded-full shadow-lg transform transition-all ease-out duration-500 hover:scale-110 group"
// className="absolute inset-0 bg-gray-800 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100" //span
// className="relative" //span
