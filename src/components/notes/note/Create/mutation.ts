import { gql } from "@apollo/client";
import { PartialNote } from "types/note";

export interface MutationVariables {
  title: string;
  description: string;
  content: string;
  topicIds: string[];
}

export interface MutationResults {
  newNote: PartialNote;
}

export default gql`
  mutation CreateNoteMutation(
    $title: String!
    $description: String
    $content: String
    $topicIds: [String]
  ) {
    newNote: createNote(
      title: $title
      description: $description
      content: $content
      topicIds: $topicIds
    ) {
      id
    }
  }
`;
