import { useContext } from "react";
import { UserContext } from "@/contexts/UserProvider";

export default function useUser() {
  const data = useContext(UserContext);

  return data;
}
