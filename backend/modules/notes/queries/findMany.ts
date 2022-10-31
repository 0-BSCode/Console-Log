import { Context } from "backend/context";
import { extendType, list, stringArg } from "nexus";
import NoteObjectType from "../typeDefs";

export default extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("notes", {
      type: NoteObjectType,
      args: {
        searchText: stringArg(),
        topicIds: list(stringArg()),
      },
      async resolve(_parent, { searchText, topicIds }, ctx: Context) {
        try {
          const user = await ctx.currentUser();

          console.log("TOPIC IDS RECEIVED");
          console.log(topicIds);

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
