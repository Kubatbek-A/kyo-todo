import { REFRESH_TOKEN_KEY } from "../tokens/tokenTypes";
import { cookie } from "./cookie";

export const accessTokenCookie = cookie("accessToken");
export const refreshTokenCookie = cookie(REFRESH_TOKEN_KEY);
