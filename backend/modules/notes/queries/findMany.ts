import { Context } from "backend/context";
import { extendType, stringArg } from "nexus";
import NoteObjectType from "../typeDefs";

export default extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("notes", {
      type: NoteObjectType,
      args: {
        searchText: stringArg(),
      },
      async resolve(_parent, { searchText }, ctx: Context) {
        try {
          const user = await ctx.currentUser();

          const notes = await ctx.prisma.note.findMany({
            where: {
              userId: user.id,
              title: {
                contains: searchText,
                mode: "insensitive",
              },
            },
            orderBy: [
              {
                updatedAt: "desc",
              },
            ],
          });
          return notes;
        } catch (e) {
          throw new Error(`ERROR ON NOTE RETRIEVAL: ${e}`);
        }
      },
    });
  },
});
