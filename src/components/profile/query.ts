import { gql } from "@apollo/client";
import { PartialTopic } from "types/topic";

export interface QueryResults {
  topics: PartialTopic[];
  topic_count: number;
}

export default gql`
  query GetUserTopicsQuery {
    topics {
      id
      name
      description
    }

    topic_count
  }
`;
