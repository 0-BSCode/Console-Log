import { Context } from "backend/context";
import { extendType } from "nexus";
import NoteObjectType from "../typeDefs";

export default extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("notes", {
      type: NoteObjectType,
      async resolve(_parent, _args, ctx: Context) {
        try {
          console.log("CALLING NOTES FINDMANY RESOLVER");
          const user = await ctx.currentUser();

          const notes = await ctx.prisma.note.findMany({
            where: {
              userId: user.id,
            },
            orderBy: [
              {
                updatedAt: "desc",
              },
            ],
          });

          console.log("NOTES");
          console.log(notes);

          console.log("NOTES FINDMANY RESOLVED");
          return notes;
        } catch (e) {
          throw new Error(`ERROR ON NOTE RETRIEVAL: ${e}`);
        }
      },
    });
  },
});
