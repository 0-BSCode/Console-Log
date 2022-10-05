import { extendType } from "nexus";
import User from "../typeDefs";
import { serialize } from "cookie";

export default extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("users", {
      type: User,
      resolve(_parent, _args, ctx) {
        ctx.res.setHeader(
          "Set-Cookie",
          serialize("token", "123456", { path: "/" })
        );
        return ctx.prisma.user.findMany();
      },
    });
  },
});
