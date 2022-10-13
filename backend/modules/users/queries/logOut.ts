import { extendType } from "nexus";
import UserObjectType from "../typeDefs";
import { serialize } from "cookie";

export default extendType({
  type: "Query",
  definition(t) {
    t.field("logout", {
      type: UserObjectType,
      async resolve(_parent, _args, ctx) {
        try {
          const currUser = await ctx.currentUser();
          const user = await ctx.prisma.user.findFirst({
            where: {
              id: currUser.userId,
            },
          });

          if (!user) throw new Error("NO USER ASSOCIATED WITH SESSION");

          ctx.res.setHeader(
            "Set-Cookie",
            serialize("token", "", { path: "/", maxAge: -1 })
          );
          return user;
        } catch (e) {
          console.error(e);
          throw new Error(`ERROR LOGGING OUT: ${e}`);
        }
      },
    });
  },
});
