import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Header } from "../components";
import { getRouteAsTitle } from "../functions";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const title = getRouteAsTitle(router.route);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default App;
