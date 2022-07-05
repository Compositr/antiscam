import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Nav from "../components/common/Nav";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Scam Database</title>
        <meta
          property="og:description"
          content="Database of Discord Scam Servers"
        />
        <meta property="og:determiner" content="the" />
        <meta property="og:locale" content="en_AU" />
        <meta property="og:site_name" content="Scam DB" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:image:src"
          content="https://cdn.discordapp.com/attachments/911812235276472331/993424410679717968/Scam_Database_1.png"
        />
      </Head>
      <SessionProvider session={pageProps.session}>
        <Nav />
        <Component {...pageProps} />
      </SessionProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
