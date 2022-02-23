import _ from "lodash/fp";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { APP_NAME } from "../consts";
import { GlobalStyles } from "../providers/styled";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { route } = router;

  // Prepare the page's title
  const routeParts = route.split("/").slice(1);
  let title = APP_NAME;

  if (routeParts.length) {
    title += ` ${_.startCase(routeParts[0])}`;

    if (routeParts.length > 1) {
      title += `• ${_.startCase(_.last(routeParts) as string)}`;
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
