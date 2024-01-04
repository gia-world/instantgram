import SmileIcon from "./ui/icons/SmileIcon";

export default function CommentForm() {
  return (
    <form className="flex items-center gap-3 border-t border-neutral-300 p-3">
      <SmileIcon />
      <input
        className="w-full border-none outline-none"
        type="text"
        placeholder="Add a comment..."
      />
      <button className="font-bold text-sky-500">Post</button>
    </form>
  );
}
