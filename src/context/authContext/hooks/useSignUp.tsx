import { useRouter } from "next/router";
import { gql, useMutation, MutationResult } from "@apollo/client";
import { PartialUser } from "types/user";
import { CurrentUserHookResult } from "./useCurrentUser";
import useCustomToast from "src/components/_hooks/useCustomToast";

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
  const toast = useCustomToast();
  const router = useRouter();
  const [signUpMutation, signUpMutationState] = useMutation<
    MutationResults,
    MutationVariables
  >(mutation, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      currentUser.set();
      router.push("/notes");
    },
    onError: (e) => {
      toast.addToast({
        description: e.message.split(":").pop(),
        status: "error",
      });
    },
  });

  return {
    execute: (args: MutationVariables) => signUpMutation({ variables: args }),
    state: signUpMutationState,
  };
};

export default useSignUp;
