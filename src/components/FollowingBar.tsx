"use client";

import React from "react";

export default function FollowingBar() {
  // 1. 클라이언트 컴포넌트에서 백엔드에게 api/me 요청 -> 사용자의 정보를 요청
  // 2. 백엔드에서 현재 로그인된 사용자의 세션 정보를 이용해서
  // 3. 백엔드에서 사용자의 상세정보를 sanity에서 가지고 옴(followings)
  // 4. 클라이언트 컴포넌트에서 followings의 정보를 UI에 보여줌(image,username)
  return <div>FollowingBar</div>;
}
