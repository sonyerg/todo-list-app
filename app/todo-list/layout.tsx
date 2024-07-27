import { auth } from "@clerk/nextjs/server";

import SideBar from "@/components/sidebar";
import { SignInButton } from "@/components/sign-in-button";
import { redirect } from "next/navigation";
import MobileNavBar from "@/components/mobile-navbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex md:flex-row flex-col">
      <div className="w-1/3 border-r md:block hidden">
        <SideBar />
      </div>
      <div className="border-b md:hidden block">
        <MobileNavBar />
      </div>
      {children}
    </div>
  );
}
