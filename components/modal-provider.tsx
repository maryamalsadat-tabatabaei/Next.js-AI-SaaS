"use client";

import { useEffect, useState } from "react";
import { PremiumModal } from "@/components/premium-modal";

function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return false;
  }
  return <PremiumModal />;
}

export default ModalProvider;
