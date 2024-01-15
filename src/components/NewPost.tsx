"use client";

import { AuthUser } from "@/model/user";
import Image from "next/image";
import { ChangeEvent, DragEvent, useState } from "react";
import PostUserAvatar from "./PostUserAvatar";
import Button from "./ui/Button";
import FilesIcon from "./ui/icons/FilesIcon";

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0], "파일");
    }
  };

  const handleDrag = (e: DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    // 파일을 드랍하면 브라우저에서 자동으로 브라우저 페이지에서 파일을 열려고 하는 동작 방지
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files; // 드랍한 파일이 있는지 확인
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0], "파일");
    }
  };

  return (
    <section className="mt-6 flex w-full max-w-xl flex-col items-center">
      <PostUserAvatar username={username} userImage={image ?? ""} />
      <form className="mt-2 flex w-full flex-col gap-2">
        <input
          className="hidden"
          name="input"
          id="input-upload"
          type="file"
          accept="image/*"
          onChange={handleChange}
        />
        <label
          className={`flex h-60 w-full flex-col items-center justify-center ${
            !file && "border-2 border-dashed border-sky-500"
          }`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="pointer-events-none absolute inset-0 z-10 bg-sky-500/20" />
          )}
          {!file && (
            <div className="pointer-events-none flex flex-col items-center">
              <FilesIcon />
              <p>Drag and Drop your Image here or click</p>
            </div>
          )}
          {file && (
            <div className="relative aspect-square w-full">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt="dropped local file"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>
        <textarea
          className="border border-neutral-300 text-lg outline-none"
          name="text"
          id="input-text"
          required
          rows={10}
          placeholder={"Write a caption"}
        />
        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
}
