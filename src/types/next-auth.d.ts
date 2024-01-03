// nextAuth 기본 타입을 커스텀할 때

import { User } from "@/model/user";
// import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    // user: {
    //   // 기본 user 타입에 username 을 추가
    //   username: string;
    // } & DefaultSession["user"];
    user: User;
  }
}
