import "../styles/globals.css";
import type { AppProps } from "next/app";
import apolloClient from "utils/initializeApollo";
import { ApolloProvider } from "@apollo/client";
import { UserProvider } from "src/context/userContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ApolloProvider>
  );
}

export default MyApp;
