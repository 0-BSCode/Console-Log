import { extendType, nonNull, stringArg } from "nexus";
import User_Session from "../typeDefs";

export default extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createUserSession", {
      type: User_Session,
      async resolve(_parent, _, ctx) {
        try {
          return await ctx.prisma.user_Session.create({
            data: {
              userId: ctx.currentUser?.id,
              accessToken: "123456",
            },
          });
        } catch (e) {
          throw new Error(`Error on session creation: ${e}`);
        }
      },
    });
  },
});
