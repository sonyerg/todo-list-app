"use client";

import { SignInButton as ClerkSignIn } from "@clerk/clerk-react";
import { UserPen } from "lucide-react";

import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import Link from "next/link";

export function SignInButton() {
  return (
    <Link href={"/sign-in"}>
      <Button variant="outline" className="my-2 flex gap-x-2">
        <UserPen />
        <p>Sign-In</p>
      </Button>
    </Link>
  );
}
