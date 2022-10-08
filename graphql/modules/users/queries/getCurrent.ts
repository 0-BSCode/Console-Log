import { extendType } from "nexus";
import UserObjectType from "../typeDefs";

export default extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("getCurrentUser", {
      type: UserObjectType,
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
