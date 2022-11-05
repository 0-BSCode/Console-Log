import { gql } from "@apollo/client";
import { Topic } from "@prisma/client";
import { PartialNote } from "types/note";
import { PartialTopic } from "types/topic";

export interface QueryVariables {
  noteId: string;
}

export interface QueryResults {
  note: PartialNote & { topics: Partial<Topic[]> };
  topics: PartialTopic[];
}

export default gql`
  query FetchNoteAndTopicsQuery($noteId: String!) {
    note(noteId: $noteId) {
      id
      title
      description
      content
      topics {
        id
        name
      }
    }

    topics {
      id
      name
      description
    }
  }
`;
