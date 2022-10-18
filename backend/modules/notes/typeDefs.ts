import { objectType } from "nexus";
import { Note, Topic } from "@prisma/client";
import UserObjectType from "../users/typeDefs";
import TopicObjectType from "../topics/typeDefs";

const NoteObjectType = objectType({
  name: "Note",
  definition(t) {
    t.string("id");
    t.nonNull.field("user", {
      type: UserObjectType,
      async resolve(parent: Note, _, ctx) {
        await ctx.currentUser();
        const owner = await ctx.prisma.user.findFirst({
          where: {
            id: parent.userId,
          },
        });

        return owner;
      },
    });
    t.string("title");
    t.string("description");
    t.string("content");
    t.list.field("topics", {
      type: TopicObjectType,
      async resolve(parent: Topic, _, ctx) {
        await ctx.currentUser();
        const topics = await ctx.prisma.topic.findMany({
          where: {
            notes: {
              some: {
                noteId: parent.id,
              },
            },
          },
        });

        return topics;
      },
    });
    t.dateTime("createdAt");
    t.dateTime("updatedAt");
  },
});

export default NoteObjectType;
