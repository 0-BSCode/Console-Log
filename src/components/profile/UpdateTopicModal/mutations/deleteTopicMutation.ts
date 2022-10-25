import { gql } from "@apollo/client";
import { PartialTopic } from "types/topic";

export interface DeleteTopicMutationVariables {
  topicId: string;
}

export interface DeleteTopicMutationResults {
  deletedTopic: PartialTopic;
}

export default gql`
  mutation DeleteTopicMutation($topicId: String!) {
    deletedTopic: deleteTopic(topicId: $topicId) {
      id
    }
  }
`;
