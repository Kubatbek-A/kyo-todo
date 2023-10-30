export interface IMedia {
  [key: string]: string;
}

export interface IColor {
  [key: string]: string;
}

export interface IApiError {
  message: string;
  errors?: Record<string, string>;
}

export interface IToken {
  get(): string;
  remove(): void;
}
