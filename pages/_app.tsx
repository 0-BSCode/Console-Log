import "../styles/globals.css";
import type { AppProps } from "next/app";
import apolloClient from "utils/initializeApollo";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "src/context/authContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
