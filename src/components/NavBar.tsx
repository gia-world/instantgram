"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  HomeFillIcon,
  HomeIcon,
  NewFillIcon,
  NewIcon,
  SearchFillIcon,
  SearchIcon,
} from "./ui/icons/MenuIcons";
import ColorButton from "./ui/ColorButton";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "./Avatar";

/*
* 모듈 다시 내보내기
// import HomeIcon from "./ui/icons/HomeIcon";
// import HomeFillIcon from "./ui/icons/HomeFillIcon";
// import SearchIcon from "./ui/icons/SearchIcon";
// import SearchFillIcon from "./ui/icons/SearchFillIcon";
// import NewIcon from "./ui/icons/NewIcon";
// import NewFillIcon from "./ui/icons/NewFillIcon";
*/

const menu = [
  { href: "/", icon: <HomeIcon />, clickedIcon: <HomeFillIcon /> },
  { href: "/search", icon: <SearchIcon />, clickedIcon: <SearchFillIcon /> },
  { href: "/new", icon: <NewIcon />, clickedIcon: <NewFillIcon /> },
];

export default function NavBar() {
  const { data: session } = useSession();
  const pathName = usePathname();
  const user = session?.user;

  return (
    <nav>
      <ul className="flex items-center gap-4">
        {menu.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>
              {pathName === item.href ? item.clickedIcon : item.icon}
            </Link>
          </li>
        ))}
        <li>
          {user && (
            <Link href={`/user/${user.username}`}>
              <Avatar image={user.image} size="small" colorBorder />
            </Link>
          )}
        </li>
        <li>
          {session ? (
            <ColorButton
              text="Sign out"
              onClick={() => {
                signOut();
              }}
            />
          ) : (
            <ColorButton
              text="Sign in"
              onClick={() => {
                signIn();
              }}
            />
          )}
        </li>
      </ul>
    </nav>
  );
}
