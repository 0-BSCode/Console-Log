import { extendType, nonNull, stringArg } from "nexus";
import User_Session from "../typeDefs";

export default extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("findUserSession", {
      type: User_Session,
      args: {
        id: nonNull(stringArg()),
      },
      async resolve(_parent, { id }, ctx) {
        return await ctx.prisma.user_Session.findFirst({
          where: {
            id,
          },
        });
      },
    });
  },
});
