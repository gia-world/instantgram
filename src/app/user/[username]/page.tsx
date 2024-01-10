import UserPost from "@/components/UserPost";
import UserProfile from "@/components/UserProfile";
import { getUserForProfile } from "@/service/user";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

type Props = { params: { username: string } };

// SEO와 컴포넌트 렌더링 시에 한 함수를 중복해서 부르지 않도록 캐싱처리
const getUser = cache(async (username: string) => getUserForProfile(username));

export default async function UserPage({ params: { username } }: Props) {
  // 클라이언트 컴포넌트는 useSWR+api 이용해서 데이터 가져오기
  // 서버컴포넌트에서는 별도의 api를 거치지 않고 바로 데이터 가져오기
  const user = await getUser(username);

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

export async function generateMetadata({
  params: { username },
}: Props): Promise<Metadata> {
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username}) | Instantgram Photos`,
    description: `${user?.name}'s all Instantgram posts`,
  };
}
