import { useMutation } from "@tanstack/react-query";

import { axiosRequest } from "@/helpers/axios-request";
import {
  RefreshTokensMutationParams,
  RefreshTokensMutationResult,
  UseRefreshTokensMutation,
} from "@/interfaces/refreshTokens";

export const refreshTokensMutation = (params: RefreshTokensMutationParams) =>
  axiosRequest<RefreshTokensMutationParams, RefreshTokensMutationResult>({
    method: "POST",
    url: "/api/auth/refresh-tokens",
    data: params,
  });

export const useRefreshTokensMutation: UseRefreshTokensMutation = () => {
  const { mutateAsync, ...result } = useMutation<
    RefreshTokensMutationResult,
    Error,
    RefreshTokensMutationParams
  >({ mutationFn: refreshTokensMutation });

  return [mutateAsync, result];
};
