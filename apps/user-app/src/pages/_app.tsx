import "./globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot, useRecoilValue } from "recoil";
import { loadingAtom } from "store";
import Loading from "./../component/loading";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>CodeCraft</title>
      </Head>
      <RecoilRoot>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </RecoilRoot>
    </>
  );
}

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const isLoading = useRecoilValue(loadingAtom);

  return (
    <>
      {isLoading && <Loading />} {children}
    </>
  );
};
