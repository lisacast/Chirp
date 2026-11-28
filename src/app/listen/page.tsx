"use client";

import { useEffect } from "react";

// Old address: meditations now live at /meditate.
export default function ListenRedirect() {
  useEffect(() => {
    location.replace(`/meditate/${location.search}`);
  }, []);
  return null;
}
