import "./globals.css";
import "@repo/ui/styles.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CodeCraft</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
