import { useRouter } from "next/router";
import { gql, useMutation, MutationResult } from "@apollo/client";
import { PartialUser } from "types/user";
import { CurrentUserHookResult } from "./useCurrentUser";

interface MutationVariables {
  username?: string;
  email?: string;
  password?: string;
}

interface MutationResults {
  user: PartialUser;
}

const mutation = gql`
  mutation SignUpMutation(
    $username: String!
    $email: String!
    $password: String!
  ) {
    user: createUser(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

interface SignUpHookProps {
  currentUser: CurrentUserHookResult;
}

export interface SignUpHookResults {
  execute: (args: MutationVariables) => void;
  state: MutationResult<MutationResults>;
}

const useSignUp = ({ currentUser }: SignUpHookProps): SignUpHookResults => {
  const router = useRouter();
  const [signUpMutation, signUpMutationState] = useMutation<
    MutationResults,
    MutationVariables
  >(mutation, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      currentUser.set();
    },
    onError: (e) => {
      console.error(e.message);
    },
  });

  return {
    execute: (args: MutationVariables) => signUpMutation({ variables: args }),
    state: signUpMutationState,
  };
};

export default useSignUp;
