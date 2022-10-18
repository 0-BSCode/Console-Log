import { extendType, nonNull, stringArg } from "nexus";
import TopicObjectType from "../typeDefs";

export default extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createTopic", {
      type: TopicObjectType,
      args: {
        name: nonNull(stringArg()),
        description: stringArg(),
      },
      async resolve(_parent, { name, description }, ctx) {
        try {
          const user = await ctx.currentUser();

          const newTopic = await ctx.prisma.topic.create({
            data: {
              userId: user.id,
              name,
              description,
            },
          });

          return newTopic;
        } catch (e) {
          console.error(e.message);
          throw new Error(`ERROR ON TOPIC CREATION: ${e.message}`);
        }
      },
    });
  },
});
