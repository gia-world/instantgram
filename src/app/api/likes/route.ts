import { dislikePost, likePost } from "@/service/posts";
import { withSessionUser } from "@/util/session";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  return withSessionUser(async (user) => {
    const { id, like } = await req.json(); // 요청한 내용(request body)에서 id,like 가져오기
    if (!id || like == null) {
      return new Response("Bad Request", { status: 400 });
    }

    const request = like ? likePost : dislikePost; // like 상태에 따라 요청을 선택 (함수 할당만)

    // 여기서 return은 Put 함수 전체가 끝나기전에 실행한다는 명시적인 표현
    return request(id, user.id) // 요청 함수 실행
      .then((res) => NextResponse.json(res))
      .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
  });
}
