import { AppProps } from "next/app";
import { ReactQueryProvider } from "../lib/react-query-client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <Component {...pageProps} />
    </ReactQueryProvider>
  );
}

export default MyApp;
