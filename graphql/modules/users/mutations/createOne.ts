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

        try {
          const newUser = await ctx.prisma.user.create({
            data: {
              username,
              email,
              password,
            },
          });

          ctx.currentUser = newUser;
          console.log("CONTEXT");
          console.log(ctx);

          return newUser;
        } catch (e) {
          throw new Error(`Error on user creation: ${JSON.stringify(e)}`);
        }
      },
    });
  },
});
