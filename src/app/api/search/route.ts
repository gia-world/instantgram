import { searchUsers } from "@/service/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
// 강제적으로 동적 렌더링을 수행하여, 각 사용자에 대한 라우팅을 요청 시에 동적으로 처리 (SSR)

export async function GET() {
  return searchUsers().then((data) => NextResponse.json(data));
  // 별도 리퀘스트 없이 항상 동일한 함수를 사용하므로 무조건 SSG로 작동
  // https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
}
