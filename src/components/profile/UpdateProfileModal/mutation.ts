import { gql } from "@apollo/client";
import { PartialUser } from "types/user";

export interface MutationVariables {
  username: string;
  email: string;
}

export interface MutationResults {
  updatedUser: PartialUser;
}

export default gql`
  mutation UpdateProfileMutation($username: String!, $email: String!) {
    updatedUser: updateUser(username: $username, email: $email) {
      id
    }
  }
`;
