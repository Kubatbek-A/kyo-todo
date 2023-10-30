import { useQueryClient } from "@tanstack/react-query";
import useAuthIdentifiers from "@/hooks/useAuthIdentifiers";
import { GET_ME_QUERY_KEY } from "@/api/users/me";
import { useRouter } from "next/router";

export default function useLogout() {
  const { authIdentifiers } = useAuthIdentifiers();
  const queryClient = useQueryClient();
  const router = useRouter();

  const logout = () => {
    authIdentifiers?.clear();
    queryClient.resetQueries();
    queryClient.invalidateQueries({ queryKey: [GET_ME_QUERY_KEY] });
    router.replace("/auth/login");
  };

  return logout;
}
