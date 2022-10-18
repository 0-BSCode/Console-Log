import { extendType, nonNull, stringArg } from "nexus";
import TopicObjectType from "../typeDefs";

export default extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("topic", {
      type: TopicObjectType,
      args: {
        name: nonNull(stringArg()),
      },
      async resolve(_parent, { name }, ctx) {
        try {
          const user = await ctx.currentUser();

          const topic = await ctx.prisma.topic.findFirst({
            where: {
              userId: user.id,
              name,
            },
          });

          return topic;
        } catch (e) {
          console.error(e.message);
          throw new Error(`ERROR ON FINDING TOPIC: ${e.message}`);
        }
      },
    });
  },
});
