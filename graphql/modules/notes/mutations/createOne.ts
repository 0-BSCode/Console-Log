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
        const user = await ctx.currentUser();

        console.log("USER");
        console.log(user);

        const owner = await ctx.prisma.user.findFirst({
          where: {
            id: user.id,
          },
        });

        console.log(`USER ID: ${user.id}`);

        const newNote = await ctx.prisma.note.create({
          data: {
            userId: user.id,
            title,
            description: description || "",
            content: content || "",
          },
        });

        return newNote;
      },
    });
  },
});
