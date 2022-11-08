import { gql, QueryResult, useLazyQuery } from "@apollo/client";
import useCustomToast from "src/components/_hooks/useCustomToast";
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
  const toast = useCustomToast();
  const [logOutQuery, logOutQueryState] = useLazyQuery<QueryResults>(query, {
    fetchPolicy: "network-only",
    onCompleted: () => {
      currentUser.set();
    },
    onError: (e) => {
      toast.addToast({
        description: e.message.split(":").pop(),
        status: "error",
      });
    },
  });

  return {
    execute: () => logOutQuery(),
    state: logOutQueryState,
  };
};

export default useSignOut;
