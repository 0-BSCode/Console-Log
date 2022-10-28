import { gql } from "@apollo/client";
import { PartialUser } from "types/user";

export interface MutationVariables {
  username: string;
  email: string;
  image?: string;
}

export interface MutationResults {
  updatedUser: PartialUser;
}

export default gql`
  mutation UpdateProfileMutation(
    $username: String!
    $email: String!
    $image: String
  ) {
    updatedUser: updateUser(username: $username, email: $email, image: $image) {
      id
    }
  }
`;
