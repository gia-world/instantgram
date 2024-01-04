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
    <>
      <div>
        <Avatar image={userImage} highlight />
        <span>{username}</span>
      </div>
      <Image
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
      />
      <div>
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div>
        <p>{`${likes?.length ?? 0} ${likes?.length > 1 ? "likes" : "like"}`}</p>
        <p>
          <span>{username}</span>
          {text}
        </p>
        <p>{parseDate(createdAt)}</p>
      </div>
      <form>
        <SmileIcon />
        <input type="text" placeholder="Add a comment..." />
        <button>Post</button>
      </form>
    </>
  );
}
