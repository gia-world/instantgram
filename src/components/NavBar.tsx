"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Avatar from "./Avatar";
import ColorButton from "./ui/ColorButton";
import {
  HomeFillIcon,
  HomeIcon,
  NewFillIcon,
  NewIcon,
  SearchFillIcon,
  SearchIcon,
} from "./ui/icons/MenuIcons";

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
  {
    href: "/",
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
    title: "Home",
  },
  {
    href: "/search",
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
    title: "Search users",
  },
  {
    href: "/new",
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
    title: "New post",
  },
];

export default function NavBar() {
  const { data: session } = useSession();
  const pathName = usePathname();
  const user = session?.user;

  return (
    <nav>
      <ul className="flex items-center gap-4">
        {menu.map(({ href, icon, clickedIcon, title }) => (
          <li key={href}>
            <Link href={href} aria-label={title}>
              {pathName === href ? clickedIcon : icon}
            </Link>
          </li>
        ))}
        {user && (
          <li>
            <Link href={`/user/${user.username}`}>
              <Avatar image={user.image} size="small" highlight />
            </Link>
          </li>
        )}
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
