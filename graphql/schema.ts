import { makeSchema } from "nexus";
import types from "./modules";
import User from "./modules/users/typeDefs";
import UserQuery from "./modules/users/queries/findMany";
import { join } from "path";

const schema = makeSchema({
  types: types,
  outputs: {
    typegen: join(
      process.cwd(),
      "node_modules",
      "@types",
      "nexus-typegen",
      "index.d.ts"
    ),
    schema: join(process.cwd(), "graphql", "schema.graphql"),
  },
  contextType: {
    export: "Context",
    module: join(process.cwd(), "graphql", "context.ts"),
  },
});

export default schema;
