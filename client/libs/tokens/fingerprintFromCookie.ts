import cookie from "js-cookie";
import generateFingerprint from "@/helpers/generateFingerprint";
import { TOKEN_FINGERPRINT_KEY } from "./tokenTypes";
import { IToken } from "@/helpers/interfaces";

const fingerprintFromCookie = async (setNew?: boolean): Promise<IToken> => {
  if (setNew || !cookie.get(TOKEN_FINGERPRINT_KEY))
    cookie.set(TOKEN_FINGERPRINT_KEY, await generateFingerprint());

  return {
    get: () => cookie.get(TOKEN_FINGERPRINT_KEY) ?? "",
    remove: () => cookie.remove(TOKEN_FINGERPRINT_KEY),
  };
};

export default fingerprintFromCookie;
