import { Comment, SimplePost } from "@/model/post";
import useSWR from "swr";

async function updateLike(id: string, like: boolean) {
  // 캐싱이 필요한 데이터, GET 요청은 SWR
  // 캐싱하면 안되는 동적 데이터, PUT, DELETE, PATCH 등 수정 요청은 fetch/axios
  return fetch("/api/likes", {
    method: "PUT",
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

async function addComment(id: string, comment: string) {
  return fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const {
    data: posts,
    isLoading,
    error,
    mutate, // 바운드된 뮤테이트 = mutate 함수가 특정 키 또는 리소스와 특별히 연결되어 있다. 여기서 키는 "/api/posts"
  } = useSWR<SimplePost[]>("/api/posts");
  //   const { mutate } = useSWRConfig();
  // mutate(key) : key를 사용하는 모든 데이터의 캐시가 revalidate 됨

  const setLike = (post: SimplePost, username: string, like: boolean) => {
    const newPost = {
      //화면상으로 업데이트할 새로운 포스트
      ...post,
      likes: like
        ? [...post.likes, username]
        : post.likes.filter((item) => item !== username),
    };
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));
    //mutate(fetcher,option)
    // fetcher함수의 리턴값을 바운드된 mutate 즉 '/api/posts'를 덮어 씌움
    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts, // 즉각적으로 UI가 업데이트 되도록
      populateCache: false, //모든 포스트에 데이터를 쓸 것이 아니므로, 반환된 값을 기존 포스트에 덮어 쓰지 않도록
      // => 백앤드에 요청이 완료되면 전달되는프로미스 데이터를 클라이언트에서 캐시하지 않겠다
      revalidate: false, // 바뀔 데이터를 이미 알고 있어서 백엔드에서 받을 필요가 없으므로
      rollbackOnError: true, // 백엔드에 제대로 업데이트가 되지 않은 경우
    });
  };
  const postComment = (post: SimplePost, comment: Comment) => {
    const newPost = {
      ...post,
      comments: post.comments + 1,
    };
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));
    return mutate(addComment(post.id, comment.comment), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { posts, isLoading, error, setLike, postComment };
}
