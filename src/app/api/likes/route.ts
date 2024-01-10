import { dislikePost, likePost } from "@/service/posts";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function PUT(req: NextRequest) {
  // post 의 like 배열에 로그인한 사용자 추가
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return new Response("Authentication Error", { status: 401 });
  }

  const { id, like } = await req.json(); // 요청한 내용(request body)에서 id,like 가져오기
  if (!id || like === undefined) {
    return new Response("Bad Request", { status: 400 });
  }

  const request = like ? likePost : dislikePost; // like 상태에 따라 요청을 선택 (함수 할당만)

  // 여기서 return은 Put 함수 전체가 끝나기전에 실행한다는 명시적인 표현
  return request(id, user.id) // 요청 함수 실행
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
