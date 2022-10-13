import { serialize } from "cookie";
import generateJwt from "backend/utils/generateJwt";
import hashPassword from "backend/utils/hashPassword";
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
        if (!username.length || !email.length || !password.length) {
          throw new Error("Please provide username, email, and password");
        }
        const userWithEmail = await ctx.prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (userWithEmail) {
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
