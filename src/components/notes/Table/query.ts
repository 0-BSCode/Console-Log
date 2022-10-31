import { gql } from "@apollo/client";
import { PartialNote } from "types/note";

export interface QueryVariables {
  searchText: string;
  topicIds: string[];
}

export interface QueryResults {
  notes: PartialNote[];
}

export default gql`
  query GetNotesQuery($searchText: String, $topicIds: [String]) {
    notes(searchText: $searchText, topicIds: $topicIds) {
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
