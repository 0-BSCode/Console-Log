import { Topic } from "@prisma/client";
import { extendType, stringArg, nonNull } from "nexus";
import TopicObjectType from "../typeDefs";

export default extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateTopic", {
      type: TopicObjectType,
      args: {
        topicId: nonNull(stringArg()),
        name: nonNull(stringArg()),
        description: stringArg(),
      },
      async resolve(_parent, { topicId, name, description }, ctx) {
        try {
          await ctx.currentUser();

          const updateObject: Partial<Topic> = {
            name,
            description: description || "",
          };

          const updatedTopic = await ctx.prisma.topic.update({
            where: {
              id: topicId,
            },
            data: updateObject,
          });

          return updatedTopic;
        } catch (e) {
          console.error(e.message);
          throw new Error(`ERROR UPDATING TOPIC: ${e.message}`);
        }
      },
    });
  },
});
