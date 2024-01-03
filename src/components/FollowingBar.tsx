"use client";

import { DetailUser } from "@/model/user";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import useSWR from "swr";
import Avatar from "./Avatar";

export default function FollowingBar() {
  /* 
  * useSWR('경로')
  = 리액트 쿼리와 동일
  라이브러리 자체적으로 데이터를 fetch 
  fetcher 옵션을 통해 fetch시 json으로 반환 설정 가능
  요청을 시작되면 자동으로 isLoading =true,
  에러 발생 시 error
  데이터를 다 받아와서 json 변환이 완료되면 data에 담아줌
  */

  const { data, isLoading, error } = useSWR<DetailUser>("/api/me");
  const users = data?.following;

  /*
  프로세스 :
  1. 클라이언트 컴포넌트에서 백엔드에게 api/me 요청 -> 사용자의 정보를 요청
  2. 백엔드에서 현재 로그인된 사용자의 세션 정보를 이용해서
  3. 백엔드에서 사용자의 상세정보를 sanity에서 가지고 옴(followings)
    * --> 여기까지 api/me/route.ts & getUserByUsername() 함수에서 작업
  4. 클라이언트 컴포넌트에서 followings의 정보를 UI에 보여줌(image,username)
  */

  return (
    <section>
      {isLoading ? (
        <PulseLoader size={8} color="#36d7b7" />
      ) : (
        (!users || users.length === 0) && (
          <p>{`you don't have any followings.`}</p>
        )
      )}
      {users && users.length > 0 && (
        <ul>
          {users.map(({ image, username }) => (
            <li key={username}>
              <Link href={`/user/${username}`}>
                <Avatar image={image} colorBorder />
                <p>{username}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
