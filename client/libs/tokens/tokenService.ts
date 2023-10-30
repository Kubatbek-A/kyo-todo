import cookie from "js-cookie";

export class TokenFromCookieOrNew implements IToken {
  private readonly name: string;

  constructor(name: string, token?: string) {
    this.name = name;

    if (token) cookie.set(name, token);
  }

  get = () => cookie.get(this.name) || "";

  remove = () => {
    cookie.remove(this.name);
  };
}

export class UserAuthIdentifiers {
  constructor(
    readonly token: IToken,
    readonly expiresAt: IToken,
    readonly fingerprint: IToken,
    readonly signImage: IToken,
  ) {}

  clear = () => {
    this.token.remove();
    this.expiresAt.remove();
    this.fingerprint.remove();
    this.signImage.remove();
  };
}
