import { SimplePost } from "@/model/post";
import Image from "next/image";
import { parseDate } from "../util/date";
import Avatar from "./Avatar";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import HeartIcon from "./ui/icons/HeartIcon";
import SmileIcon from "./ui/icons/SmileIcon";

type Props = {
  post: SimplePost;
};

export default function PostCard({ post }: Props) {
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
      />
      <div className="my-2 flex justify-between px-4">
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div className="px-4 py-1">
        <p className="mb-2 text-sm font-bold">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? "likes" : "like"
        }`}</p>
        <p>
          <span className="mr-1 font-bold">{username}</span>
          {text}
        </p>
        <p className="my-2 text-xs uppercase text-neutral-500">
          {parseDate(createdAt)}
        </p>
        <form className="flex items-center gap-3 border-t border-neutral-300 p-3">
          <SmileIcon />
          <input
            className="w-full border-none outline-none"
            type="text"
            placeholder="Add a comment..."
          />
          <button className="font-bold text-sky-500">Post</button>
        </form>
      </div>
    </article>
  );
}
