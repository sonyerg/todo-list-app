import { auth } from "@clerk/nextjs/server";

import SideBar from "@/components/sidebar";
import { SignInButton } from "@/components/sign-in-button";
import { redirect } from "next/navigation";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <div className="w-1/3 border-r md:block hidden">
        <SideBar />
      </div>
      {children}
    </div>
  );
}
