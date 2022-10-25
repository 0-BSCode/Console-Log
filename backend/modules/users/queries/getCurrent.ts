import { extendType } from "nexus";
import UserObjectType from "../typeDefs";

export default extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("current_user", {
      type: UserObjectType,
      async resolve(_parent, _args, ctx) {
        try {
          const user = await ctx.currentUser();

          const currUser = await ctx.prisma.user.findFirst({
            where: {
              id: user.id,
            },
          });

          return currUser;
        } catch (e) {
          console.error(e.message);
          throw new Error(`ERROR RETRIEVING CURRENT USER: ${e.message}`);
        }
      },
    });
  },
});
