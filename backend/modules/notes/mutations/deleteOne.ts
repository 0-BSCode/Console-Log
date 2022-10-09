import { extendType, nonNull, stringArg } from "nexus";
import NoteObjectType from "../typeDefs";

export default extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteNote", {
      type: NoteObjectType,
      args: {
        noteId: nonNull(stringArg()),
      },
      async resolve(_parent, { noteId }, ctx) {
        try {
          const currentUser = await ctx.currentUser();

          const note = await ctx.prisma.note.findFirst({
            where: {
              id: noteId,
              userId: currentUser.userId,
            },
          });

          if (!note) throw new Error("Not authorized!");

          const deletedNote = await ctx.prisma.note.delete({
            where: {
              id: noteId,
            },
          });

          return deletedNote;
        } catch (e) {
          console.error(e);
          throw new Error(`ERROR ON NOTE DELETION: ${e}`);
        }
      },
    });
  },
});
