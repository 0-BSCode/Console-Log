import { gql } from "@apollo/client";
import { Topic } from "@prisma/client";

export type MutationVariables = Partial<Topic>;
export interface MutationResults {
  newTopic: Partial<Topic>;
}

export default gql`
  mutation CreateTopicMutation($name: String!, $description: String) {
    newTopic: createTopic(name: $name, description: $description) {
      id
      name
    }
  }
`;
