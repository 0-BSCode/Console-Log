import { gql } from "@apollo/client";
import { PartialUser } from "types/user";

export interface MutationVariables {
  username: string;
  email: string;
  image?: string;
  password?: string;
  newPassword?: string;
}

export interface MutationResults {
  updatedUser: PartialUser;
}

export default gql`
  mutation UpdateProfileMutation(
    $username: String!
    $email: String!
    $image: String
    $password: String
    $newPassword: String
  ) {
    updatedUser: updateUser(
      username: $username
      email: $email
      image: $image
      password: $password
      newPassword: $newPassword
    ) {
      id
    }
  }
`;
