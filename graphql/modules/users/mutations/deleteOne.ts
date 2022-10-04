import { extendType, nonNull, stringArg } from "nexus";
import User from "../typeDefs";

export default extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteUser", {
      type: User,
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, { id }, ctx) {
        return ctx.prisma.user.delete({
          where: {
            id,
          },
        });
      },
    });
  },
});
