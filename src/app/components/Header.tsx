import Link from "next/link";
import React from "react";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className="sticky top-0 bg-white z-10 border-b flex justify-between items-center px-6 py-4">
      <Link href="/">
        <h1 className="text-3xl font-bold">Instantgram</h1>
      </Link>
      <NavBar />
    </header>
  );
}
