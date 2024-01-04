import Link from "next/link";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b bg-white ">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-6 py-4">
        <Link href="/">
          <h1 className="text-3xl font-bold">Instantgram</h1>
        </Link>
        <NavBar />
      </div>
    </header>
  );
}
