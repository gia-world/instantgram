import FollowingBar from "@/components/FollowingBar";
import PostList from "@/components/PostList";
import SideBar from "@/components/SideBar";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function HomePage() {
  // * session 값을 가져오는 두가지 방법
  // getServerSession() -서버 사이드 & useSession() -클라이언트 사이드
  const session = await getServerSession(authOptions);
  // console.log(session, "session");
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }

  /*
  ? SideBar 컴포넌트 자체에서 session정보를 불러오지 않고 굳이 Props로 전달하는 이유?
  -> 엘리 답변 : 페이지 컴포넌트(실제 데이터를 들고 있는 컴포넌트 container component, 큰 그룹 단위)와 일반 컴포넌트(단위성, presentaional component)에 대해 구분을 해주는게 좋다
  =>>
  * sidebar의 목적 : user를 불러오는 목적이 아닌 받아온 데이터를 보여주기 위함(data injection) ->  컴포넌트의 활용성 up
  */

  return (
    <section className="flex w-full max-w-[850px] flex-col gap-8 p-4 md:flex-row">
      <div className="w-full min-w-0 basis-3/4">
        <FollowingBar />
        <PostList />
      </div>
      <div className="basis-1/4">
        <SideBar user={user} />
      </div>
    </section>
  );
}
