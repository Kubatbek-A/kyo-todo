import { useContext } from "react";
import { AuthIdentifiersContext } from "@/contexts/AuthIdentifiersProvider";

export default function useAuthIdentifiers() {
  const data = useContext(AuthIdentifiersContext);

  return data;
}
