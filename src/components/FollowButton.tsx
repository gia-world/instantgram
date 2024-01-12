"use client";

import useMe from "@/hooks/me";
import { ProfileUser } from "@/model/user";
import Button from "./ui/Button";

type Props = {
  user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
  const { username } = user;
  // 로그인 여부, 팔로잉 여부에 따라 달라짐
  const { user: LoggedInUser } = useMe();
  const showButton = LoggedInUser && LoggedInUser.username !== username;
  const following =
    LoggedInUser &&
    LoggedInUser.following.find((item) => item.username === username);
  const text = following ? "Unfollow" : "Follow";
  return (
    <>
      {showButton && (
        <Button text={text} onClick={() => {}} red={text === "Unfollow"} />
      )}
    </>
  );
}
