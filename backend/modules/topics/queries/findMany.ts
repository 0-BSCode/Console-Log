import { extendType } from "nexus";
import TopicObjectType from "../typeDefs";

export default extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("topics", {
      type: TopicObjectType,
      async resolve(_parent, _args, ctx) {
        try {
          const user = await ctx.currentUser();

          const topics = await ctx.prisma.topic.findMany({
            where: {
              userId: user.id,
            },
          });

          return topics;
        } catch (e) {
          console.error(e.message);
          throw new Error(`ERROR ON FINDING TOPICS: ${e.message}`);
        }
      },
    });
  },
});
