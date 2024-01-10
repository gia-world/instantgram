"use client";

import { ProfileUser } from "@/model/user";
import { useState } from "react";
import useSWR from "swr";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import PostIcon from "./ui/icons/PostIcon";

type Props = {
  user: ProfileUser;
};

const tabs = [
  { type: "posts", icon: <PostIcon /> },
  { type: "saved", icon: <BookmarkIcon className="h-3 w-3" /> },
  { type: "liked", icon: <HeartIcon className="h-3 w-3" /> },
];

export default function UserPost({ user: { username } }: Props) {
  // /api/users/${username}/posts
  // /api/users/${username}/liked
  // /api/users/${username}/bookmarks
  const [tab, setTab] = useState("liked");
  const {
    data: posts,
    isLoading,
    error,
  } = useSWR(`/api/users/${username}/${tab}`);
  console.log(posts, "posts");

  return (
    <section>
      <ul>
        {tabs.map(({ type, icon }) => (
          <li key={type}>
            <button>{icon}</button>
            <span>{type}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
