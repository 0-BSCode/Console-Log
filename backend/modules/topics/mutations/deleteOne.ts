import { extendType, nonNull, stringArg } from "nexus";
import TopicObjectType from "../typeDefs";

export default extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteTopic", {
      type: TopicObjectType,
      args: {
        topicId: nonNull(stringArg()),
      },
      async resolve(_parent, { topicId }, ctx) {
        try {
          const user = await ctx.currentUser();

          const topic = await ctx.prisma.topic.findFirst({
            where: {
              id: topicId,
            },
          });

          if (!topic) throw new Error(`Topic does not exist!`);

          const deletedTopic = await ctx.prisma.topic.delete({
            where: {
              id: topic.id,
            },
          });

          return deletedTopic;
        } catch (e) {
          console.error(e.message);
          throw new Error(`ERROR ON TOPIC DELETION: ${e.message}`);
        }
      },
    });
  },
});
