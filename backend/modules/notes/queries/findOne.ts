import { extendType, nonNull, stringArg } from "nexus";
import NoteObjectType from "../typeDefs";
import { Context } from "backend/context";

export default extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("note", {
      type: NoteObjectType,
      args: {
        noteId: nonNull(stringArg()),
      },
      async resolve(_parent, { noteId }, ctx: Context) {
        try {
          const user = await ctx.currentUser();

          if (!user) throw new Error("Not authorized");

          const note = await ctx.prisma.note.findFirst({
            where: {
              id: noteId,
            },
          });

          return note;
        } catch (e) {
          console.error(e.message);
          throw new Error(`ERROR RETRIEVING NOTE: ${e.message}`);
        }
      },
    });
  },
});
