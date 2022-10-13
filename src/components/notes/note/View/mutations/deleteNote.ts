import { gql } from "@apollo/client";
import { PartialNote } from "types/note";

export interface DeleteNoteMutationResults {
  note: PartialNote;
}

export interface DeleteNoteMutationVariables {
  noteId: string;
}

export default gql`
  mutation DeleteNoteMutation($noteId: String!) {
    note: deleteNote(noteId: $noteId) {
      id
    }
  }
`;
