import { gql } from "@apollo/client";
import { Topic } from "@prisma/client";

export interface TopicsListQueryResults {
  topics: Partial<Topic[]>;
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
