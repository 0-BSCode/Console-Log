import { extendType, nonNull, stringArg, list } from "nexus";
import NoteObjectType from "../typeDefs";

export default extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createNote", {
      type: NoteObjectType,
      args: {
        title: nonNull(stringArg()),
        description: stringArg(),
        content: stringArg(),
        topicIds: list(stringArg()),
      },
      async resolve(_parent, { title, description, content, topicIds }, ctx) {
        try {
          const user = await ctx.currentUser();

          const newNote = await ctx.prisma.note.create({
            data: {
              userId: user.id,
              title,
              description: description || "",
              content: content || "",
            },
          });

          if (topicIds?.length) {
            await topicIds.forEach(async (id) => {
              await ctx.prisma.noteTopics.create({
                data: {
                  noteId: newNote.id,
                  topicId: id,
                },
              });
            });
          }

          return newNote;
        } catch (e) {
          console.error(e.message);
          throw new Error(`ERROR ON NOTE CREATION: ${e.message}`);
        }
      },
    });
  },
});
