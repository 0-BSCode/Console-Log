import { User } from "@prisma/client";
import { extendType, stringArg, nonNull } from "nexus";
import UserObjectType from "../typeDefs";

export default extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateUser", {
      type: UserObjectType,
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
      },
      async resolve(_parents, { username, email }, ctx) {
        try {
          const user = await ctx.currentUser();

          const updateObject: Partial<User> = {
            // email,
          };

          if (username.length < 10) {
            throw new Error("Username not long enough");
          } else {
            updateObject.username = username;
          }

          console.log("CURRENT USER");
          console.log(user);

          //   TODO: Email validation
          if (email.length) {
            const matchingEmail = await ctx.prisma.user.findFirst({
              where: {
                id: { not: user.id },
                email,
              },
            });

            console.log("MATCHING USER");
            console.log(matchingEmail);

            if (matchingEmail) throw new Error("Email already exists");
          }

          const updatedUser = await ctx.prisma.user.update({
            where: {
              id: user.id,
            },
            data: updateObject,
          });

          return updatedUser;
        } catch (e) {
          console.error(e.message);
          throw new Error(`ERROR UPDATING PROFILE: ${e.message}`);
        }
      },
    });
  },
});
