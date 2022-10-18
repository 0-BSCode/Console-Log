import { Note } from "@prisma/client";
import { extendType, nonNull, stringArg } from "nexus";
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
      },
      async resolve(_parent, { title, description, content }, ctx) {
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

          return newNote;
        } catch (e) {
          console.error(e.message);
          throw new Error(`ERROR ON NOTE CREATION: ${e.message}`);
        }
      },
    });
  },
});
