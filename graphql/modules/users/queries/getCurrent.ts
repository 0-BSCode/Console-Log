import authenticateUser from "graphql/utils/authenticateUser";
import { extendType } from "nexus";
import User from "../typeDefs";

export default extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("getCurrentUser", {
      type: User,
      async resolve(_parent, _args, ctx) {
        const { id } = await ctx.currentUser();
        return await ctx.prisma.user.findFirst({
          where: {
            id,
          },
        });
      },
    });
  },
});
