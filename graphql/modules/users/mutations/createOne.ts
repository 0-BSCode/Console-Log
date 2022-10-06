import { serialize } from "cookie";
import authenticateUser from "graphql/utils/authenticateUser";
import generateJwt from "graphql/utils/generateJwt";
import hashPassword from "graphql/utils/hashPassword";
import { extendType, nonNull, stringArg } from "nexus";
import User from "../typeDefs";

export default extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createUser", {
      type: User,
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_parent, { username, email, password }, ctx) {
        const userWithEmail = await ctx.prisma.user.findMany({
          where: {
            email,
          },
        });

        if (!!userWithEmail.length) {
          throw new Error("Email is already associated with an account!");
        }

        const hashedPassword = await hashPassword(password);

        try {
          const newUser = await ctx.prisma.user.create({
            data: {
              username,
              email,
              password: hashedPassword,
            },
          });

          await ctx.prisma.user_Session.create({
            data: {
              userId: newUser.id,
              accessToken: "123456",
            },
          });

          const jwt = generateJwt(newUser.id);
          ctx.res.setHeader(
            "Set-Cookie",
            serialize("token", jwt, { path: "/" })
          );

          return newUser;
        } catch (e) {
          console.error(e);
          throw new Error(`Error on user creation: ${JSON.stringify(e)}`);
        }
      },
    });
  },
});
