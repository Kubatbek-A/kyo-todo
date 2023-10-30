import { ReactNode, createContext, useEffect, useState } from "react";

import fingerprintFromCookie from "@/libs/tokens/fingerprintFromCookie";
import {
  TokenFromCookieOrNew,
  UserAuthIdentifiers,
} from "@/helpers/tokens/tokenService";
import {
  ACCESS_TOKEN_KEY,
  TOKEN_EXPIRES_AT_KEY,
  TOKEN_IMAGE_SIGN_KEY,
} from "@/libs/tokens/tokenTypes";

export const AuthIdentifiersContext = createContext<{
  authIdentifiers?: UserAuthIdentifiers;
  setAuthIdentifiers: (newInstance: UserAuthIdentifiers) => void;
}>({ authIdentifiers: undefined, setAuthIdentifiers: () => ({}) });

export default function AuthIdentifiersProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [authIdentifiers, setAuthIdentifiers] = useState<UserAuthIdentifiers>();

  useEffect(() => {
    const tokenInstance = new TokenFromCookieOrNew(ACCESS_TOKEN_KEY);

    if (tokenInstance) {
      (async () => {
        setAuthIdentifiers(
          new UserAuthIdentifiers(
            new TokenFromCookieOrNew(ACCESS_TOKEN_KEY),
            new TokenFromCookieOrNew(TOKEN_EXPIRES_AT_KEY),
            await fingerprintFromCookie(),
            new TokenFromCookieOrNew(TOKEN_IMAGE_SIGN_KEY),
          ),
        );
      })();
    }
  }, []);

  return (
    <AuthIdentifiersContext.Provider
      value={{ authIdentifiers, setAuthIdentifiers }}
    >
      {children}
    </AuthIdentifiersContext.Provider>
  );
}
