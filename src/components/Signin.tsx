"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import React from "react";
import ColorButton from "./ui/ColorButton";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function Signin({ providers, callbackUrl }: Props) {
  return (
    <>
      {/* 객체인 providers에서 밸류값만 가져와 배열로 생성 */}
      {/* providers => {google : {...} } */}
      {Object.values(providers).map(({ name, id }) => (
        <ColorButton
          key={name}
          text={` Sign in with ${name}`}
          onClick={() => signIn(id, { callbackUrl })}
          size="big"
        />
      ))}
    </>
  );
}
