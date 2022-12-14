import { Prisma } from "@prisma/client";
import { Context } from "backend/context";
import parseNoteTopics from "backend/utils/parseNoteTopics";
import { extendType, list, stringArg, intArg, nonNull } from "nexus";
import { PartialNote } from "types/note";
import NoteObjectType from "../typeDefs";

export default extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("notes", {
      type: NoteObjectType,
      args: {
        searchText: stringArg(),
        topicIds: list(stringArg()),
        skip: nonNull(intArg()),
        limit: nonNull(intArg()),
        sortDirection: nonNull(stringArg()),
      },
      async resolve(
        _parent,
        { searchText, topicIds, skip, limit, sortDirection },
        ctx: Context
      ) {
        try {
          const user = await ctx.currentUser();

          let notes: PartialNote[];

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

            notes = await ctx.prisma.note.findMany({
              where: {
                id: {
                  in: finalTopics,
                },
              },
              orderBy: [
                {
                  updatedAt: Prisma.SortOrder[sortDirection],
                },
              ],
              skip,
              take: limit,
            });
          } else {
            notes = await ctx.prisma.note.findMany({
              where: {
                userId: user.id,
                title: {
                  contains: searchText,
                  mode: "insensitive",
                },
              },
              orderBy: [
                {
                  updatedAt: Prisma.SortOrder[sortDirection],
                },
              ],
              skip,
              take: limit,
            });
          }

          return notes;
        } catch (e) {
          throw new Error(`ERROR ON NOTE RETRIEVAL: ${e}`);
        }
      },
    });
  },
});
