import Avatar from "./Avatar";

type Props = {
  username: string;
  userImage: string;
};

export default function PostUserAvatar({ username, userImage }: Props) {
  return (
    <div className="flex items-center gap-2 p-2">
      <Avatar image={userImage} size="medium" highlight />
      <span className="font-bold text-gray-900">{username}</span>
    </div>
  );
}
