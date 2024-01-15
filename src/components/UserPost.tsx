"use client";

import { CacheKeysContext } from "@/context/CacheKeysContext";
import { ProfileUser } from "@/model/user";
import { useState } from "react";
import PostGrid from "./PostGrid";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import PostIcon from "./ui/icons/PostIcon";

type Props = {
  user: ProfileUser;
};

const tabs = [
  { type: "posts", icon: <PostIcon />, title: "User posts" },
  {
    type: "saved",
    icon: <BookmarkIcon className="h-3 w-3" />,
    title: "Saved posts",
  },
  {
    type: "liked",
    icon: <HeartIcon className="h-3 w-3" />,
    title: "Liked posts",
  },
];

export default function UserPost({ user: { username } }: Props) {
  // /api/users/${username}/posts
  // /api/users/${username}/liked
  // /api/users/${username}/bookmarks
  const [query, setQuery] = useState(tabs[0].type);

  return (
    <section>
      <ul className="flex justify-center gap-12 uppercase">
        {tabs.map(({ type, icon, title }) => (
          <li
            className={`cursor-pointer border-black p-4 ${
              type === query && "border-t font-bold"
            }`}
            key={type}
            onClick={() => setQuery(type)}
          >
            <button className="scale-150 md:scale-100" aria-label={title}>
              {icon}
            </button>
            <span className="ml-2 hidden md:inline">{type}</span>
          </li>
        ))}
      </ul>
      <CacheKeysContext.Provider
        value={{ postsKey: `/api/users/${username}/${query}` }}
      >
        <PostGrid />
      </CacheKeysContext.Provider>
    </section>
  );
}
