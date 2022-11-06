import { gql } from "@apollo/client";
import { PartialNote } from "types/note";

export interface QueryVariables {
  searchText: string;
  skip: number;
  limit: number;
  sortDirection: "asc" | "desc";
  topicIds: string[];
}

export interface QueryResults {
  notes: PartialNote[];
  notesCount: number;
}

export default gql`
  query GetNotesQuery(
    $searchText: String
    $topicIds: [String]
    $skip: Int!
    $limit: Int!
    $sortDirection: String!
  ) {
    notes(
      searchText: $searchText
      topicIds: $topicIds
      skip: $skip
      limit: $limit
      sortDirection: $sortDirection
    ) {
      id
      title
      description
      content
      topics {
        id
        name
      }
    }

    notesCount: note_count(searchText: $searchText, topicIds: $topicIds)
  }
`;
