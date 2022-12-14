import { ApolloServer } from "apollo-server-micro";
import schema from "backend/schema";
import Cors from "micro-cors";
import { createContext } from "backend/context";
import { NextApiRequest, NextApiResponse } from "next";

const cors = Cors();

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
});

const startServer = apolloServer.start();

export default cors(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
