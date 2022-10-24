import { gql } from "@apollo/client";
import { PartialNote } from "types/note";

export interface UpdateNoteMutationVariables {
  noteId: string;
  title?: string;
  description?: string;
  content?: string;
  topicIds?: string[];
}

export interface UpdateNoteMutationResults {
  updateNote: PartialNote;
}

export default gql`
  mutation UpdateNoteMutation(
    $noteId: String!
    $title: String
    $description: String
    $content: String
    $topicIds: [String]
  ) {
    updateNote(
      noteId: $noteId
      title: $title
      description: $description
      content: $content
      topicIds: $topicIds
    ) {
      id
    }
  }
`;
