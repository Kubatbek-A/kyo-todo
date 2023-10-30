import cookie from "js-cookie";
import { TOKEN_IMAGE_SIGN_KEY } from "./tokenTypes";

export const getImageSignKeyFromCookie = (): string => {
  return cookie.get(TOKEN_IMAGE_SIGN_KEY) ?? "";
};
