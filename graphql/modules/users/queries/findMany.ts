import { extendType } from "nexus";
import User from "../typeDefs";
export default extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("users", {
      type: User,
      async resolve(_parent, _args, ctx) {
        try {
          await ctx.currentUser();

          return await ctx.prisma.user.findMany();
        } catch (e) {
          console.error(e);
          throw new Error(`Error on fetching: ${e}`);
        }
      },
    });
  },
});
