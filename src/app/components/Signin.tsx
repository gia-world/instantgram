"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import React from "react";
import ColorButton from "./ui/ColorButton";

type Props = {
  providers: Record<string, ClientSafeProvider>;
};

export default function Signin({ providers }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <ColorButton
          key={name}
          text={` Sign in with ${name}`}
          onClick={() => signIn(id)}
          size="big"
        />
      ))}
    </>
  );
}
