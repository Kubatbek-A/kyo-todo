import { useQuery } from "@tanstack/react-query";
import { axiosRequest } from "@/helpers/axios-request";
import { MeQueryResult, UseMeQuery } from "@/interfaces/me";

export const GET_ME_QUERY_KEY = "me";

export const meQuery = async (token?: string) =>
  axiosRequest<unknown, MeQueryResult>({
    method: "GET",
    url: "/api/users/me",
    token,
  });

export const useMeQuery: UseMeQuery = () => {
  return useQuery({
    queryKey: [GET_ME_QUERY_KEY],
    queryFn: () => meQuery(),
  });
};
