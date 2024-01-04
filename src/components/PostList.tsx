"use client";

import { SimplePost } from "@/model/post";
import { GridLoader } from "react-spinners";
import useSWR from "swr";
import PostCard from "./PostCard";

export default function PostList() {
  const { data: posts, isLoading } = useSWR<SimplePost[]>("/api/posts");

  return (
    <section>
      {isLoading && (
        <div>
          <GridLoader color="#36d7b7" />
        </div>
      )}
      {posts && (
        <ul>
          {posts &&
            posts.map((post) => (
              <li key={post.id}>
                <PostCard post={post} />
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
