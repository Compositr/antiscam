import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Nav from "../components/common/Nav";

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
