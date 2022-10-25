import { gql } from "@apollo/client";
import { PartialTopic } from "types/topic";
import { PartialUser } from "types/user";

export interface QueryResults {
  currentUser: PartialUser;
  topics: PartialTopic[];
  topic_count: number;
}

export default gql`
  query GetUserTopicsQuery {
    currentUser: current_user {
      id
      username
      email
    }

    topics {
      id
      name
      description
    }

    topic_count
  }
`;
