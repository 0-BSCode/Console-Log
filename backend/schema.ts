import { makeSchema } from "nexus";
import types from "./modules";
import scalarTypes from "./scalars";
import { join } from "path";

const schema = makeSchema({
  types: [types, scalarTypes],
  outputs: {
    typegen: join(
      process.cwd(),
      "node_modules",
      "@types",
      "nexus-typegen",
      "index.d.ts"
    ),
    schema: join(process.cwd(), "backend", "schema.graphql"),
  },
  contextType: {
    export: "Context",
    module: join(process.cwd(), "backend", "context.ts"),
  },
});

export default schema;
