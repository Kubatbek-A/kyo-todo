import { ReactNode, createContext, useMemo } from "react";
import { useMeQuery } from "@/api/users/me";
import { MeQueryResult } from "@/interfaces/me";

export const UserContext = createContext<{
  user: MeQueryResult | null | undefined;
  isLoading: boolean;
}>({ user: undefined, isLoading: false });

export default function UserProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useMeQuery();

  const contextValue = useMemo(
    () => ({ user: data, isLoading }),
    [JSON.stringify(data), isLoading],
  );

  return (
    <>
      <UserContext.Provider value={contextValue}>
        {children}
      </UserContext.Provider>
    </>
  );
}
