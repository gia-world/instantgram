import { AuthUser } from "@/model/user";
import Avatar from "./Avatar";

type Props = {
  user: AuthUser;
};

export default function SideBar({ user: { name, username, image } }: Props) {
  return (
    <aside>
      <div className="flex items-center">
        {image && <Avatar image={image} />}
        <div className="ml-4">
          <p className="font-bold">{username}</p>
          <p className="text-lg leading-4 text-neutral-500">{name}</p>
        </div>
      </div>
      <p
        className="mt-8 text-sm text-neutral-500
      "
      >
        About &middot; Help &middot; Press &middot; API &middot; Jobs &middot;
        Privacy &middot; Terms &middot; Location &middot; Language
      </p>
      <p className="mt-8 text-sm font-bold text-neutral-500">
        &copy; Copyright INSTANTGRAM from METAL
      </p>
    </aside>
  );
}
