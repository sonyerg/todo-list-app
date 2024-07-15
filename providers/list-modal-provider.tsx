"use client";

import ListModal from "@/components/modals/list-modal";
import React, { useEffect, useState } from "react";

export default function ListModalProvider() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ListModal />
    </>
  );
}
