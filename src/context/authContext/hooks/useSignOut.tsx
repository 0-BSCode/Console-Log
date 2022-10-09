import { gql, QueryResult, useLazyQuery } from "@apollo/client";
import { PartialUser } from "types/user";
import { CurrentUserHookResult } from "./useCurrentUser";

interface QueryResults {
  user: PartialUser;
}

const query = gql`
  query LogOut {
    user: logout {
      id
    }
  }
`;

interface SignOutHookProps {
  currentUser: CurrentUserHookResult;
}

export interface SignOutHookResults {
  execute: () => void;
  state: QueryResult<QueryResults>;
}

const useSignOut = ({ currentUser }: SignOutHookProps) => {
  const [logOutQuery, logOutQueryState] = useLazyQuery<QueryResults>(query, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      currentUser.reset();
    },
    onError: (e) => {
      console.error(e.message);
    },
  });

  return {
    execute: () => logOutQuery(),
    state: logOutQueryState,
  };
};

export default useSignOut;
