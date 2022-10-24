import { gql } from "@apollo/client";
import { PartialTopic } from "types/topic";

export interface QueryResults {
  topics: PartialTopic[];
}

export default gql`
  query FetchTopicsListQuery {
    topics {
      id
      name
      description
    }
  }
`;
