"use client";

import useMe from "@/hooks/me";
import { ProfileUser } from "@/model/user";
// import useSWR from "swr";
import Button from "./ui/Button";

type Props = {
  user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
  const { username } = user;
  // 로그인 여부, 팔로잉 여부에 따라 달라짐
  const { user: LoggedInUser, toggleFollow } = useMe();

  // const { data: follow, isLoading, error, mutate } = useSWR("/api/follow");
  // console.log(follow, "follow");
  const loggedInUsername = LoggedInUser && LoggedInUser.username;

  const showButton = loggedInUsername !== username;
  const following =
    LoggedInUser &&
    LoggedInUser.following.find((item) => item.username === username);
  const text = following ? "Unfollow" : "Follow";

  const handleFollow = () => {
    toggleFollow(user.id, !following);
  };

  return (
    <>
      {showButton && (
        <Button text={text} onClick={handleFollow} red={text === "Unfollow"} />
      )}
    </>
  );
}
