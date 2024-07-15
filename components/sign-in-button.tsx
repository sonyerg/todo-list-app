"use client";

import { SignInButton as ClerkSignIn } from "@clerk/clerk-react";
import { UserButton } from "@clerk/nextjs";
import { UserPen } from "lucide-react";

import { Button } from "./ui/button";

export function SignInButton() {
  return (
    <>
      <ClerkSignIn>
        <Button variant="outline" className="my-2 flex gap-x-2 ">
          <UserPen />
          <p>Sign-In</p>
        </Button>
      </ClerkSignIn>
    </>
  );
}
