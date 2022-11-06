import { NoteTopics } from "@prisma/client";

interface Props {
  noteTopics: { [noteId: string]: string }[];
  topicIds: string[];
}

const parseNoteTopics = ({ noteTopics, topicIds }: Props) => {
  const flattenedTopics = noteTopics.map((noteTopic) => noteTopic.noteId);

  const topicsCount: { id?: number } = {};
  flattenedTopics.forEach((topicId) => {
    if (topicsCount[topicId]) {
      topicsCount[topicId] += 1;
    } else {
      topicsCount[topicId] = 1;
    }
  });

  const finalTopics = Object.keys(topicsCount).filter(
    (topicId) => topicsCount[topicId] === topicIds.length
  );

  return finalTopics;
};

export default parseNoteTopics;
