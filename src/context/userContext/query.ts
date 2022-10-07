import { gql } from "@apollo/client";
import { PartialUser } from "types/user";

export interface QueryResults {
  user: PartialUser;
}

export default gql`
  query GetCurrentUserQuery {
    user: getCurrentUser {
      id
      email
      username
    }
  }
`;
