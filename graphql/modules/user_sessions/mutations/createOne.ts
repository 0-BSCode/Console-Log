import { extendType } from "nexus";
import User_Session from "../typeDefs";

export default extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createUserSession", {
      type: User_Session,
      async resolve(_, __, ctx) {
        try {
          const user = await ctx.currentUser;
          return await ctx.prisma.user_Session.create({
            data: {
              userId: user.userId,
              accessToken: "123456",
            },
          });
        } catch (e) {
          console.error(e);
          throw new Error(`Error on session creation: ${e}`);
        }
      },
    });
  },
});
