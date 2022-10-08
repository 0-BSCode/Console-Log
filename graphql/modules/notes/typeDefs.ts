import { objectType } from "nexus";
import { Note } from "@prisma/client";
import UserObjectType from "../users/typeDefs";

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
    t.dateTime("createdAt");
    t.dateTime("updatedAt");
  },
});

export default NoteObjectType;
