// nextAuth 기본 타입을 커스텀할 때

import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
    } & DefaultSession["user"];
    // 기본 user 타입에 username 을 추가
  }
}
