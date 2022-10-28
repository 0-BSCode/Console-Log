import { ApolloClient, InMemoryCache } from "@apollo/client";
import gqlConstants from "constants/graphql";

const apolloClient = new ApolloClient({
  uri: gqlConstants.API_URL,
  cache: new InMemoryCache(),
  credentials: "include",
});

export default apolloClient;
