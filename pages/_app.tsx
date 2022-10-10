import "../styles/globals.css";
import type { AppProps } from "next/app";
import apolloClient from "src/utils/initializeApollo";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "src/context/authContext";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
