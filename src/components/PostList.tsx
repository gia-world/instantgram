"use client";

import { SimplePost } from "@/model/post";
import useSWR from "swr";
import PostListCard from "./PostListCard";
import GridSpinner from "./ui/GridSpinner";

export default function PostList() {
  const { data: posts, isLoading } = useSWR<SimplePost[]>("/api/posts");

  return (
    <section>
      {isLoading && (
        <div className="mt-32 text-center">
          <GridSpinner />
        </div>
      )}
      {posts && (
        <ul>
          {posts &&
            posts.map((post, index) => (
              <li key={post.id} className="mb-4">
                <PostListCard post={post} priority={index < 2} />
              </li>
            ))}
        </ul>
      )}
    </section>
  );
}
