import "../styles/globals.css";
import type { AppProps } from "next/app";
import apolloClient from "src/_utils/initializeApollo";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "src/context/authContext";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "src/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <ChakraProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
