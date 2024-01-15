"use client";

import { AuthUser } from "@/model/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, DragEvent, FormEvent, useRef, useState } from "react";
import PostUserAvatar from "./PostUserAvatar";
import Button from "./ui/Button";
import GridSpinner from "./ui/GridSpinner";
import FilesIcon from "./ui/icons/FilesIcon";

type Props = {
  user: AuthUser;
};

export default function NewPost({ user: { username, image } }: Props) {
  const router = useRouter();
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);
  // textarea에 바로 onChange 핸들러를 붙이면
  // 텍스트를 입력할때마다 내부상태가 업데이트 되서 리렌더링 발생
  // -> 컨트롤 컴포넌트로 사용하지 않고 ref를 전달
  // ref는 실시간 입력값을 어딘가에 저장중

  //* 컨트롤 컴포넌트 : textarea 같은 폼 요소에 대한 입력을 제어하면서, 입력값과 컴포넌트의 상태를 동기화하는 방식
  // onChange 없이 state만 사용할 경우 실시간 입력값을 고정할 수 없음

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
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
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", textRef.current?.value ?? "");

    fetch("/api/posts", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
        }
        router.push("/");
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };

  return (
    <section className="mt-6 flex w-full max-w-xl flex-col items-center">
      {loading && (
        <div className="absolute inset-0 z-20 bg-sky-500/20 pt-[30%] text-center">
          <GridSpinner />
        </div>
      )}
      {error && (
        <p className="mb-4 w-full bg-red-100 p-4 text-center font-bold text-red-600">
          {error}
        </p>
      )}
      <PostUserAvatar username={username} userImage={image ?? ""} />
      <form className="mt-2 flex w-full flex-col gap-2" onSubmit={handleSubmit}>
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
          ref={textRef}
        />
        <Button text="Publish" onClick={() => {}} />
      </form>
    </section>
  );
}
