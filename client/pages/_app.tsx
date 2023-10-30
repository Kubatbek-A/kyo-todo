import { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ConfigProvider as AntDesignConfigProvider } from "antd";
import { GlobalStyles } from "@/helpers/styles/globalStyles";
// import CustomThemeProvider from "@/UI/Provider/themeProvider";
import { antdThemeLight } from "@/helpers/styles/antdTheme";
import generatedJson from "../generated.json";
import AuthIdentifiersProvider from "@/contexts/AuthIdentifiersProvider";
import UserProvider from "@/contexts/UserProvider";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import dynamic from "next/dynamic";

const CustomThemeProvider = dynamic(
  () => import("@/UI/Provider/themeProvider"),
);

const insert2body = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  div.style.display = "none";
  document.querySelector("body")?.prepend(div);
};

(async () => {
  if (typeof window !== "undefined" && "caches" in window) {
    const spriteLink = `/images/sprite.svg?v=${generatedJson.spriteHash}`;
    const newCache = await caches.open("sprite");
    const options = {
      method: "GET",
      headers: new Headers({
        "Content-Type": "image/svg+xml",
      }),
    };
    let response = await newCache.match(spriteLink);
    let html;

    if (!response) {
      const req = new Request(spriteLink, options);
      await newCache.add(req);
      response = await newCache.match(spriteLink);
      if (!response) {
        response = await fetch(spriteLink);
      }
      html = await response?.text();
      insert2body(html || "");
      return;
    }

    html = await response.text();
    insert2body(html);
  }
})();

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            networkMode: "always",
            retry: 0,
            refetchOnWindowFocus: false,
          },
          mutations: {
            networkMode: "always",
            retry: 0,
          },
        },
      }),
  );

  return (
    <>
      <AntDesignConfigProvider theme={antdThemeLight}>
        <CustomThemeProvider>
          <GlobalStyles />
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <AuthIdentifiersProvider>
                <UserProvider>
                  <Component {...pageProps} />
                </UserProvider>
              </AuthIdentifiersProvider>
            </Hydrate>

            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </CustomThemeProvider>
      </AntDesignConfigProvider>
    </>
  );
}

export default MyApp;
