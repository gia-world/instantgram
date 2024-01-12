import { SimplePost } from "@/model/post";
import useSWR, { useSWRConfig } from "swr";

export default function usePost() {
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>("/api/posts");
  const { mutate } = useSWRConfig();

  const setLike = (post: SimplePost, username: string, like: boolean) => {
    fetch("/api/likes", {
      method: "PUT",
      body: JSON.stringify({ id: post.id, like }),
    }).then(() => mutate("/api/posts"));
    // mutate(key) : key를 사용하는 모든 데이터의 캐시가 revalidate 됨

    // 캐싱이 필요한 데이터, GET 요청은 SWR
    // 캐싱하면 안되는 동적 데이터, PUT, DELETE, PATCH 등 수정 요청은 fetch/axios
  };
  return { posts, isLoading, error, setLike };
}
