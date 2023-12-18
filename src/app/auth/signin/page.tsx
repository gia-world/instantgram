import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Signin from "@/app/components/Signin";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }
  const providers = (await getProviders()) ?? {};

  return (
    <section className="flex justify-center mt-[30%]">
      <Signin providers={providers} />
    </section>
  );
}
