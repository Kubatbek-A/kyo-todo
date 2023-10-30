import useSSRLayoutEffect from "@/hooks/useSSRLayoutEffect/useSSRLayoutEffect";
import { ReactNode, useState } from "react";
import { createPortal } from "react-dom";

export default function BodyPortal(props: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useSSRLayoutEffect(() => setIsMounted(true), []);

  return <>{isMounted && createPortal(props.children, document.body)}</>;
}
