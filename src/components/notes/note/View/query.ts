import { gql } from "@apollo/client";
import { PartialNote } from "types/note";

export interface QueryVariables {
  noteId: string;
}

export interface QueryResults {
  note: PartialNote;
}

export default gql`
  query GetNoteQuery($noteId: String!) {
    note(noteId: $noteId) {
      id
      title
      description
      content
      topics {
        id
      }
    }
  }
`;
