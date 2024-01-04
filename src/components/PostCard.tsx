import { SimplePost } from "@/model/post";
import Image from "next/image";
import ActionBar from "./ActionBar";
import Avatar from "./Avatar";
import CommentForm from "./CommentForm";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostCard({ post, priority = false }: Props) {
  const { userImage, username, image, createdAt, likes, text } = post;
  return (
    <article className="rounded-lg border border-gray-200 shadow-md">
      <div className="flex items-center gap-2 p-2">
        <Avatar image={userImage} size="medium" highlight />
        <span className="font-bold text-gray-900">{username}</span>
      </div>
      <Image
        className="aspect-square w-full object-cover"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
      />
      <ActionBar
        likes={likes}
        username={username}
        createdAt={createdAt}
        text={text}
      />
      <CommentForm />
    </article>
  );
}
