import { useState, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { PartialUser } from "types/user";

interface QueryResults {
  user: PartialUser;
}

const query = gql`
  query GetCurrentUserQuery {
    user: getCurrentUser {
      id
      email
      username
    }
  }
`;

export interface CurrentUserHookResult {
  get: () => PartialUser;
  set: () => void;
  reset: () => void;
}

const useCurrentUser = (): CurrentUserHookResult => {
  const [currentUser, setCurrentUser] = useState<PartialUser>(undefined);

  const [getUserQuery, getUserQueryState] = useLazyQuery<QueryResults>(query, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log("FETCH USER COMPLETED");
      console.log(data.user);
      setCurrentUser(data.user);
    },
    onError: (e) => {
      console.error(e.message);
    },
  });

  useEffect(() => {
    console.log("HELLO WORLD");
  }, []);

  return {
    get: () => currentUser,
    set: () => getUserQuery(),
    reset: () => setCurrentUser(undefined),
  };
};

export default useCurrentUser;
