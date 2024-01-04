"use client";

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

export default function PostCard({ post, priority = false }: Props) {
  const { userImage, username, image, createdAt, likes, text } = post;
  const [openModal, setOpenModal] = useState(false);

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
      <ActionBar
        likes={likes}
        username={username}
        createdAt={createdAt}
        text={text}
      />
      <CommentForm />
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
