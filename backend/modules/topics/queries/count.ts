import { extendType } from "nexus";

export default extendType({
  type: "Query",
  definition(t) {
    t.nonNull.int("topic_count", {
      async resolve(_parent, _args, ctx) {
        try {
          const user = await ctx.currentUser();

          const topics = await ctx.prisma.topic.findMany({
            where: {
              userId: user.userId,
            },
          });

          return topics.length;
        } catch (e) {
          console.error(e.message);
          throw new Error(`ERROR FETCHING TOPIC COUNT: ${e.message}`);
        }
      },
    });
  },
});
