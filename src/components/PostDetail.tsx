import { FullPost, SimplePost } from "@/model/post";
import Image from "next/image";
import useSWR from "swr";
import ActionBar from "./ActionBar";
import Avatar from "./Avatar";
import PostUserAvatar from "./PostUserAvatar";

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, userImage, username, image, createdAt, likes, text } = post;
  const { data } = useSWR<FullPost>(`api/posts/${id}`);
  const comments = data?.comments;

  return (
    <section className="flex h-full w-full">
      <div className="relative basis-3/5">
        <Image
          className="object-cover"
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes="650px"
        />
      </div>
      <div className="flex w-full basis-2/5 flex-col">
        <PostUserAvatar userImage={userImage} username={username} />
        <ul className="overflow-y-autop-4 mb-1 h-full border-t border-gray-200">
          {comments &&
            comments.map(
              (
                {
                  userImage: commentUserImage,
                  username: commentUsername,
                  comment,
                },
                index,
              ) => (
                <li key={index} className="mb-1 flex items-center gap-2">
                  <Avatar
                    image={commentUserImage}
                    size="small"
                    highlight={commentUsername === username}
                  />
                  <div>
                    <span className="mr-1 font-bold">{commentUsername}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              ),
            )}
        </ul>
        <ActionBar likes={likes} username={username} createdAt={createdAt} />
      </div>
    </section>
  );
}
