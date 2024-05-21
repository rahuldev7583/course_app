// pages/_app.tsx

import "./globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot, useRecoilValue } from "recoil";
import { loadingAtom } from "store";
import Loading from "./../component/loading"; // Assuming you have a Loading component

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>CodeCraft Admin</title>
      </Head>
      <RecoilRoot>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </RecoilRoot>
    </>
  );
};

interface AppWrapperProps {
  children: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const isLoading = useRecoilValue(loadingAtom);

  return (
    <>
      {isLoading && <Loading />}{" "}
      {/* Show loading indicator if loading state is true */}
      {children}
    </>
  );
};

export default App;
