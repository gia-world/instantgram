import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  // console.log(session, "session");
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }

  /*
  ? SideBar 컴포넌트 자체에서 session정보를 불러오지 않고 굳이 Props로 전달하는 이유?
  -> 엘리 답변 : 페이지 컴포넌트와 일반 컴포넌트에 대해 구분을 해주는게 좋다
  */

  return (
    <section className="flex w-full max-w-[850px] flex-col p-4 md:flex-row">
      <div className="w-full basis-3/4">
        <FollowingBar />
        <PostList />
      </div>
      <div className="basis-1/4">
        <SideBar user={user} />
      </div>
    </section>
  );
}
