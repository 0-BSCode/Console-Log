import { objectType } from "nexus";
import UserObjectType from "../users/typeDefs";
import { Topic } from "@prisma/client";
import NoteObjectType from "../notes/typeDefs";

const TopicObjectType = objectType({
  name: "Topic",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("description");
    t.nonNull.field("user", {
      type: UserObjectType,
      async resolve(parent: Topic, _args, ctx) {
        await ctx.currentUser();
        const owner = await prisma.user.findFirst({
          where: {
            id: parent.userId,
          },
        });
        return owner;
      },
    });
    t.list.field("notes", {
      type: NoteObjectType,
      async resolve(parent: Topic, _args, ctx) {
        await ctx.currentUser();
        const notes = await prisma.note.findMany({
          where: {
            topics: {
              some: {
                topicId: parent.id,
              },
            },
          },
        });

        return notes;
      },
    });
    t.dateTime("createdAt");
    t.dateTime("updatedAt");
  },
});

export default TopicObjectType;
