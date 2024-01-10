import UserPost from "@/components/UserPost";
import UserProfile from "@/components/UserProfile";
import { getUserForProfile } from "@/service/user";
import { notFound } from "next/navigation";

type Props = { params: { username: string } };

export default async function UserPage({ params: { username } }: Props) {
  // 클라이언트 컴포넌트는 useSWR+api 이용해서 데이터 가져오기
  // 서버컴포넌트에서는 별도의 api를 거치지 않고 바로 데이터 가져오기
  const user = await getUserForProfile(username);

  if (!user) {
    notFound();
  }

  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPost user={user} />
    </section>
  );
}
