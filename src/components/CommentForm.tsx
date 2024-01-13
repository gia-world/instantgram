import { FormEvent, useState } from "react";
import SmileIcon from "./ui/icons/SmileIcon";

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState("");
  const buttonDisabled = comment.length === 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment("");
  };

  return (
    <form
      className="flex items-center gap-3 border-t border-neutral-300 p-3"
      onSubmit={handleSubmit}
    >
      <SmileIcon />
      <input
        className="w-full border-none outline-none"
        type="text"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        disabled={buttonDisabled}
        className={`font-bold ${
          buttonDisabled ? "text-sky-300" : "text-sky-500"
        }`}
      >
        Post
      </button>
    </form>
  );
}
