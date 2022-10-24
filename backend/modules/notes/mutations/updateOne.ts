import { Note } from "@prisma/client";
import { extendType, nonNull, stringArg, list } from "nexus";
import NoteObjectType from "../typeDefs";

export default extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateNote", {
      type: NoteObjectType,
      args: {
        noteId: nonNull(stringArg()),
        title: stringArg(),
        description: stringArg(),
        content: stringArg(),
        topicIds: list(stringArg()),
      },
      async resolve(
        _parent,
        { noteId, title, description, content, topicIds },
        ctx
      ) {
        try {
          const currentUser = await ctx.currentUser();

          const note = await ctx.prisma.note.findFirst({
            where: {
              id: noteId,
              userId: currentUser.userId,
            },
          });

          if (!note) throw new Error("Not authorized");

          const updateObject: Partial<Note> = {
            id: noteId,
            title,
            description,
            content,
          };

          const updatedNote = await ctx.prisma.note.update({
            where: {
              id: noteId,
            },
            data: updateObject,
          });

          await prisma.noteTopics.deleteMany({
            where: {
              noteId,
            },
          });

          if (topicIds?.length) {
            await topicIds.forEach(async (id) => {
              await ctx.prisma.noteTopics.create({
                data: {
                  noteId,
                  topicId: id,
                },
              });
            });
          }

          return updatedNote;
        } catch (e) {
          console.error(e);
          throw new Error(`ERROR ON NOTE UPDATING: ${e}`);
        }
      },
    });
  },
});
