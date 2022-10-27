import { gql } from "@apollo/client";
import { PartialNote } from "types/note";

export interface MutationResults {
  note: PartialNote;
}

export interface MutationVariables {
  noteId: string;
}

export default gql`
  mutation DeleteNoteMutation($noteId: String!) {
    note: deleteNote(noteId: $noteId) {
      id
    }
  }
`;
