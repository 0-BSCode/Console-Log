import { gql } from "@apollo/client";
import { PartialTopic } from "types/topic";

export interface EditTopicMutationVariables {
  topicId: string;
  name: string;
  description: string;
}

export interface EditTopicMutationResults {
  udpatedTopic: PartialTopic;
}

export default gql`
  mutation EditTopicMutation(
    $topicId: String!
    $name: String!
    $description: String
  ) {
    updatedTopic: updateTopic(
      topicId: $topicId
      name: $name
      description: $description
    ) {
      id
    }
  }
`;
