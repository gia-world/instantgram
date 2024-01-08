import { ProfileUser } from "@/model/user";
import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
  user: ProfileUser;
};

export default function UserCard({
  user: { name, username, image, following, followers },
}: Props) {
  /*
   * userCard를 구성하는 법
   1. 일반카드에 click event를 이용해 useRouter로 특정 경로로 이동 (굳이 prefetching 필요 없을 때)
   2. Link -> 사용자 브라우저 상에 해당 링크가 보여졌을 때 prefetching 해서 가져옴 (최적화)
    */
  return (
    <Link
      className="mb-2 flex w-full items-center gap-2 rounded-sm border border-neutral-300 bg-white p-4 hover:bg-neutral-50"
      href={`/user/${username}`}
    >
      <Avatar image={image} />
      <div className="text-neutral-500">
        <p className="font-bold leading-5 text-black">{username}</p>
        <p>{name}</p>
        <p className="text-sm leading-4">{`${followers} followers  ${following} following`}</p>
      </div>
    </Link>
  );
}
