import { UseQueryResult } from "@tanstack/react-query";

export interface MeQueryResult extends IUser {}

export type UseMeQuery = () => UseQueryResult<MeQueryResult, Error>;
