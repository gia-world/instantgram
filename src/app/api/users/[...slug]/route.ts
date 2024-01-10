import { getLikedPostsOf, getPostsOf, getSavedPostsOf } from "@/service/posts";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: {
    slug: string[]; // slug/slug/slug
  };
};

export async function GET(_: NextRequest, context: Context) {
  const { slug } = context.params;
  if (!slug || !Array.isArray(slug) || slug.length < 2) {
    return new NextResponse("Bad Request", { status: 400 });
  }
  const [username, query] = slug;

  let request = getPostsOf;
  if (query === "saved") {
    request = getSavedPostsOf;
  } else if (query === "liked") {
    request = getLikedPostsOf;
  }
  // 여기까지 함수 호출 전, 참조값만 request에 할당해둔 상태
  // query에 따라 어떤 함수를 호출할 지 pick만 해둠

  return request(username).then((data) => NextResponse.json(data));
}
