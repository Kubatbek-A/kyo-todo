import { UseMutationResult } from "@tanstack/react-query";

export interface RefreshTokensMutationParams {
  fingerprint: string;
}

export interface RefreshTokensMutationResult {
  expiresAt: string;
  accessToken: string;
}

export type UseRefreshTokensMutation = () => [
  UseMutationResult<
    RefreshTokensMutationResult,
    Error,
    RefreshTokensMutationParams
  >["mutateAsync"],
  Omit<
    UseMutationResult<
      RefreshTokensMutationResult,
      Error,
      RefreshTokensMutationParams
    >,
    "mutateAsync"
  >,
];
