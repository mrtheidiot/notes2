import Link from "next/link";

import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex content-center py-2 w-full m-auto border-solid border-b-2 space-x-4">
        <Link href='/dailynotes'>Daily Notes</Link>
        <Link href='/notes'>All Notes</Link>
        <Link href='/notes/add'>Add New Note</Link>
    </nav>
  )
}

export default Navbar