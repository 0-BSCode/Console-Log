import { extendType, stringArg } from "nexus";
import NoteObjectType from "../typeDefs";

export default extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("notes", {
      type: NoteObjectType,
      args: {
        userId: stringArg(),
      },
      async resolve(_parent, { userId }, ctx) {
        try {
          console.log("CALLING NOTES FINDMANY RESOLVER");
          const user = await ctx.currentUser();

          console.log("CURRENT USER");
          console.log(user);

          const notes = await ctx.prisma.note.findMany({
            where: {
              userId: userId || user.id,
            },
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
