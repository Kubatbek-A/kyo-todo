import { useEffect } from "react";
import { useRefreshTokensMutation } from "@/api/auth/refresh-tokens";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import fingerprintFromCookie from "@/libs/tokens/fingerprintFromCookie";
import {
  TokenFromCookieOrNew,
  UserAuthIdentifiers,
} from "@/libs/tokens/tokenService";
import useSSRLayoutEffect from "@/hooks/useSSRLayoutEffect/useSSRLayoutEffect";
import { LoadingOverlay } from "@/UI/TaskDateInput/TaskDateInput.styled";
import useAuthIdentifiers from "@/hooks/useAuthIdentifiers";
import {
  ACCESS_TOKEN_KEY,
  TOKEN_EXPIRES_AT_KEY,
  TOKEN_IMAGE_SIGN_KEY,
} from "@/libs/tokens/tokenTypes";

export default function LoginSuccess() {
  const queryClient = useQueryClient();
  const {
    replace,
    query: { sign },
  } = useRouter();
  const { setAuthIdentifiers } = useAuthIdentifiers();
  const [refreshTokens] = useRefreshTokensMutation();

  const redirectUrl = "/";

  useEffect(() => {
    (async () => {
      const fpInstance = await fingerprintFromCookie();

      refreshTokens({ fingerprint: fpInstance.get() })
        .then(({ accessToken, expiresAt }) => {
          const tokenInstance = new TokenFromCookieOrNew(
            ACCESS_TOKEN_KEY,
            accessToken,
          );
          const expiresAtInstance = new TokenFromCookieOrNew(
            TOKEN_EXPIRES_AT_KEY,
            expiresAt,
          );

          setAuthIdentifiers(
            new UserAuthIdentifiers(
              tokenInstance,
              expiresAtInstance,
              fpInstance,
              new TokenFromCookieOrNew(
                TOKEN_IMAGE_SIGN_KEY,
                sign as string | undefined,
              ),
            ),
          );

          queryClient.refetchQueries();
        })
        .finally(() => replace(redirectUrl));
    })();
  }, []);

  return <LoadingOverlay />;
}
