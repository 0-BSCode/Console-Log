import { ApolloClient, InMemoryCache } from "@apollo/client";
import gqlConstants from "constants/graphql";
const apolloClient = new ApolloClient({
  uri: gqlConstants.API_URL,
  cache: new InMemoryCache(),
});

export default apolloClient;
