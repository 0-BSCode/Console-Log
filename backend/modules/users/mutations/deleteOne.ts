import { extendType, nonNull, stringArg } from "nexus";
import User from "../typeDefs";

export default extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteUser", {
      type: User,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_parent, { id }, ctx) {
        return await ctx.prisma.user.delete({
          where: {
            id,
          },
        });
      },
    });
  },
});
