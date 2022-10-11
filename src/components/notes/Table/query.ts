import { gql } from "@apollo/client";
import { PartialNote } from "types/note";

export interface QueryResults {
  notes: PartialNote;
}

export default gql`
  query GetNotesQuery {
    notes {
      id
      title
      description
      content
    }
  }
`;
