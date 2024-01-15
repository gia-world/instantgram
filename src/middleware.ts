import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";

// 미들웨어 함수 정의
export async function middleware(req: NextRequest) {
  // 현재 요청에서 JWT 토큰을 추출
  const token = await getToken({ req });
  //   console.log("middleware");

  if (!token) {
    if (req.nextUrl.pathname.startsWith("/api")) {
      return new NextResponse("Authentication Error", { status: 401 });
    }

    // 로그인 페이지로 리다이렉트
    const { pathname, search, origin, basePath } = req.nextUrl;
    const signInUrl = new URL(`${basePath}/auth/signin`, origin);
    signInUrl.searchParams.append(
      "callbackURL",
      `${basePath}${pathname}${search}`,
    );

    return NextResponse.redirect(signInUrl);
  }

  // 토큰이 있는 경우, 다음 미들웨어로 넘어감
  return NextResponse.next();
}

// 미들웨어에 대한 구성 정의
export const config = {
  // 미들웨어가 적용될 경로 목록
  matcher: [
    "/new",
    "/",
    "/api/bookmarks",
    "/api/comments",
    "/api/likes",
    "/api/follow",
    "/api/me",
    "/api/posts/:path*",
  ],
};
