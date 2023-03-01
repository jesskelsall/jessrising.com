import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Header, TContentArea } from "../components/Header/Header";
import { getRouteAsTitle } from "../functions/title";
import "../styles.css";

interface IAppProps {
  contentArea?: TContentArea;
}

const App = ({ Component, pageProps }: AppProps<IAppProps>) => {
  const router = useRouter();
  const title = getRouteAsTitle(router.route);
  const { contentArea } = pageProps;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header contentArea={contentArea} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
