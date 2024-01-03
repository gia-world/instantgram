"use client";

import React from "react";
import useSWR from "swr";

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
  const { data, isLoading, error } = useSWR("/api/hello");
  console.log(data, "following bar");

  // 1. 클라이언트 컴포넌트에서 백엔드에게 api/me 요청 -> 사용자의 정보를 요청
  // 2. 백엔드에서 현재 로그인된 사용자의 세션 정보를 이용해서
  // 3. 백엔드에서 사용자의 상세정보를 sanity에서 가지고 옴(followings)
  // 4. 클라이언트 컴포넌트에서 followings의 정보를 UI에 보여줌(image,username)
  return <div>FollowingBar</div>;
}
