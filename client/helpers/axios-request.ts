import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  Method,
  ResponseType,
} from "axios";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "./tokens/tokenTypes";
import { TokenFromCookieOrNew } from "./tokens/tokenService";

export type ApiParams<T> = {
  method: Method;
  url: string;
  data?: T;
  token?: string;
  contentType?: string;
  baseURL?: string;
  params?: object;
  responseType?: ResponseType;
};

const Url = process.env.NEXT_PUBLIC_API_URL || "";
// const Url = "https://main-expansion-cajun-koi-api.exp.outsi.de/"; // temp

const tokenInstance = new TokenFromCookieOrNew(ACCESS_TOKEN_KEY);

const createAxiosResponseInterceptor = () => {
  const interceptor = axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const token = tokenInstance.get();

      if (
        token &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        console.error("401, please check accessToken");
      }

      axios.interceptors.response.eject(interceptor);
      createAxiosResponseInterceptor();

      return Promise.reject(error);
    },
  );
};

export const axiosRequest = async <TRequestData, TResponseData = void>({
  method,
  url,
  data,
  baseURL,
  token: SSRToken,
  params,
  header,
  contentType = "application/json",
  responseType,
}: ApiParams<TRequestData> & {
  header?: AxiosRequestHeaders;
}): Promise<TResponseData> => {
  const config: AxiosRequestConfig<TRequestData> = {
    baseURL,
    data,
    method,
    url,
    params,
    withCredentials: true,
    responseType,
  };

  const token = Cookies.get("accessToken") || SSRToken;

  if (!config.baseURL) config.baseURL = Url;

  if (header) {
    config.headers = header;
  }

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  if (contentType) {
    config.headers = {
      ...config.headers,
      "content-type": contentType,
    };
  }

  try {
    createAxiosResponseInterceptor();

    const response = await axios.request(config);

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
