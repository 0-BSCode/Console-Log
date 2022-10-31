import { gql } from "@apollo/client";
import { PartialTopic } from "types/topic";

export interface QueryResults {
  topics: PartialTopic[];
}

export default gql`
  query UserTopicsQuery {
    topics {
      id
      name
    }
  }
`;
