import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { SignInButton } from "@/components/sign-in-button";

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (userId) {
    redirect("/todo-list");
  }

  return (
    <div>
      <UserButton />
      {!userId && <SignInButton />}
      {children}
    </div>
  );
}
