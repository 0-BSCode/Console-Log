import { gql } from "@apollo/client";
import { PartialNote } from "types/note";

export interface QueryVariables {
  searchText: string;
}

export interface QueryResults {
  notes: PartialNote[];
}

export default gql`
  query GetNotesQuery($searchText: String) {
    notes(searchText: $searchText) {
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
