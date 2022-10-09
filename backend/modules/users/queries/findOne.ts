import { extendType, nonNull, stringArg } from "nexus";
import UserObjectType from "../typeDefs";

export default extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("user", {
      type: UserObjectType,
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_parent, { email }, ctx) {
        try {
          const user = await ctx.prisma.user.findFirst({
            where: {
              email,
            },
          });

          return user;
        } catch (e) {
          console.error(e);
          throw new Error(`ERROR ON FETCHING USER: ${e}`);
        }
      },
    });
  },
});
