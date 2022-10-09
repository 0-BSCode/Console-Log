import { extendType } from "nexus";
import UserObjectType from "../typeDefs";
export default extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("users", {
      type: UserObjectType,
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
