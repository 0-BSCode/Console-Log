import { extendType, nonNull, stringArg } from "nexus";
import User from "../typeDefs";
import bcrypt from "bcrypt";
import generateJwt from "graphql/utils/generateJwt";
import { serialize } from "cookie";

export default extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("user", {
      type: User,
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_parent, { email, password }, ctx) {
        try {
          const user = await ctx.prisma.user.findFirst({
            where: {
              email,
            },
          });

          if (!user) throw new Error("User does not exist!");

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (!passwordsMatch) {
            throw new Error("Password does not match provided email");
          }

          const jwt = generateJwt(user.id);
          ctx.res.setHeader(
            "Set-Cookie",
            serialize("token", jwt, { path: "/" })
          );

          return user;
        } catch (e) {
          console.error(e);
          throw new Error(`ERROR ON FETCHING USER: ${e}`);
        }
      },
    });
  },
});
