import { gql, QueryResult, useLazyQuery } from "@apollo/client";
import { PartialUser } from "types/user";
import { CurrentUserHookResult } from "./useCurrentUser";
import { useRouter } from "next/router";

interface QueryVariables {
  email?: string;
  password?: string;
}

interface QueryResults {
  user: PartialUser;
}

const query = gql`
  query LoginQuery($email: String!, $password: String!) {
    user: logIn(email: $email, password: $password) {
      id
      email
      username
    }
  }
`;

interface SignInHookProps {
  currentUser: CurrentUserHookResult;
}

export interface SignInHookResults {
  execute: (args: QueryVariables) => void;
  state: QueryResult<QueryResults>;
}

const useSignIn = ({ currentUser }: SignInHookProps): SignInHookResults => {
  const router = useRouter();
  const [logInQuery, logInQueryState] = useLazyQuery(query, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      currentUser.set();
      router.push("/notes");
    },
    onError: (e) => {
      console.error(e.message);
    },
  });

  return {
    execute: (args: QueryVariables) => logInQuery({ variables: args }),
    state: logInQueryState,
  };
};

export default useSignIn;
