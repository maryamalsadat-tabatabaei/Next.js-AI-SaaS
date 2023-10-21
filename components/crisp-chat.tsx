"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    const crispWebsiteId = process.env.CRISP_WEBSITE_ID!;
    Crisp.configure("354d6141-54f6-4ff4-8eab-1fd3237356d4");
  }, []);

  return null;
};
