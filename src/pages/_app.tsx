import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { Footer } from "../components/Footer";
import { Header, TContentArea } from "../components/Header";
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
      <Footer />
    </>
  );
};

export default App;
