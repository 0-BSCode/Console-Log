import { extendType, list, stringArg } from "nexus";
import { Context } from "backend/context";
import parseNoteTopics from "backend/utils/parseNoteTopics";

export default extendType({
  type: "Query",
  definition(t) {
    t.nonNull.int("note_count", {
      args: {
        searchText: stringArg(),
        topicIds: list(stringArg()),
      },
      resolve: async (_parent, { searchText, topicIds }, ctx: Context) => {
        try {
          const user = await ctx.currentUser();

          let noteCount;

          if (topicIds?.length) {
            const noteTopics = await ctx.prisma.noteTopics.findMany({
              where: {
                topicId: {
                  in: topicIds,
                },
                AND: {
                  note: {
                    userId: user.id,
                  },
                },
              },
              select: {
                noteId: true,
              },
            });

            const finalTopics = parseNoteTopics({ noteTopics, topicIds });

            noteCount = await ctx.prisma.note.aggregate({
              where: {
                id: {
                  in: finalTopics,
                },
              },
              _count: {
                id: true,
              },
            });
          } else {
            noteCount = await ctx.prisma.note.aggregate({
              where: {
                userId: user.id,
                title: {
                  contains: searchText,
                  mode: "insensitive",
                },
              },
              _count: {
                id: true,
              },
            });
          }

          return noteCount._count.id;
        } catch (e) {
          console.error(e.message);
          throw new Error(`ERROR RETRIEVING NOTE COUNT: ${e.message}`);
        }
      },
    });
  },
});
