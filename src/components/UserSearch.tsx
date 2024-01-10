"use client";

import useDebounce from "@/hooks/debounce";
import { SearchUser } from "@/model/user";
import { FormEvent, useState } from "react";
import useSWR from "swr";
import GridSpinner from "./ui/GridSpinner";
import UserCard from "./UserCard";

export default function UserSearch() {
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword);
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="my-4 flex w-full max-w-2xl flex-col  items-center gap-4">
      <form className="w-full" onSubmit={onSubmit}>
        <input
          className="w-full border border-gray-400 p-3 text-xl outline-none"
          type="text"
          placeholder="Search for a username or name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          autoFocus
        />
      </form>
      {error && <p>Something went wrong</p>}
      {isLoading && <GridSpinner />}
      {!error && !isLoading && users?.length === 0 && (
        <p>찾는 사용자가 없습니다.</p>
      )}
      <ul className="w-full p-4">
        {users &&
          users.map((user) => (
            <li key={user.username}>
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}
