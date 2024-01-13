"use client";

import usePost from "@/hooks/posts";
import { SimplePost } from "@/model/post";
import Image from "next/image";
import { useState } from "react";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";
import PostDetail from "./PostDetail";
import PostModal from "./PostModal";
import PostUserAvatar from "./PostUserAvatar";
import ModalPortal from "./ui/ModalPortal";

type Props = {
  post: SimplePost;
  priority?: boolean;
};

export default function PostListCard({ post, priority = false }: Props) {
  const { userImage, username, image, comments, text } = post;
  const [openModal, setOpenModal] = useState(false);
  const { postComment } = usePost();

  const handlePostComment = (comment: string) => {
    postComment(post, comment);
  };

  return (
    <article className="rounded-lg border border-gray-200 shadow-md">
      <PostUserAvatar userImage={userImage} username={username} />
      <Image
        className="aspect-square w-full object-cover"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post}>
        <p>
          <span className="mr-1 font-bold">{username}</span>
          {text}
        </p>
        {comments > 1 && (
          <button
            className="my-2 font-bold text-sky-500"
            onClick={() => setOpenModal(true)}
          >{`View all ${comments} comments`}</button>
        )}
      </ActionBar>
      <CommentForm onPostComment={handlePostComment} />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
