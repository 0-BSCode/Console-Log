import { gql } from "@apollo/client";
import { Topic } from "@prisma/client";
import { PartialNote } from "types/note";

export interface QueryVariables {
  noteId: string;
}

export interface QueryResults {
  note: PartialNote & { topics: Partial<Topic[]> };
}

export default gql`
  query FetchNoteQuery($noteId: String!) {
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
  }
`;
