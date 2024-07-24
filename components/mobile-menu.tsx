"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import NewListButton from "./new-list-button";
import Lists from "./lists";
import { List } from "@prisma/client";

export default function MobileMenu({ lists }: { lists: List[] }) {
  const [menu, setMenu] = useState(false);

  function handleMenu() {
    setMenu((prevState) => !prevState);
  }

  return (
    <>
      <button className="ml-3" onClick={() => setMenu(true)}>
        <Menu size={20} />
      </button>
      <div
        className={
          menu
            ? "absolute left-0 top-0 w-full h-screen ease-in-out duration-200 bg-black/70 backdrop-blur-sm  md:hidden z-10"
            : ""
        }
        onClick={handleMenu}
      >
        <div
          className={
            menu
              ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-white p-10 ease-in duration-200 z-20"
              : "fixed left-[-100%] ease-out duration-500"
          }
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 rounded-full shadow-lg"
            onClick={handleMenu}
          >
            <X size={20} />
          </button>
          <div className="mt-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-bold uppercase md:text-lg">
                <Link href={"/"}>To-do Lists</Link>
              </h2>
              <NewListButton />
            </div>
            <Lists lists={lists} setMobileMenu={handleMenu} />
          </div>
        </div>
      </div>
    </>
  );
}
