import { Context, createContext, ReactElement, useState } from "react";
import { PartialUser } from "types/user";
import { useQuery } from "@apollo/client";
import query, { QueryResults } from "./query";

export interface UserContextType {
  currentUser?: PartialUser;
  setCurrentUser?: (user: PartialUser) => void;
}

export const UserContext: Context<UserContextType> =
  createContext<UserContextType>({});

export const UserProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [currentUser, setCurrentUser] = useState<PartialUser>();

  const { data, loading, error } = useQuery<QueryResults>(query, {
    onCompleted: (data) => {
      console.log(`FETCH USER QUERY COMPLETED: ${JSON.stringify(data)}`);
      setCurrentUser(data.user);
    },
    onError: (e) => {
      console.log(`FETCH USER QUERY ERROR: ${e}`);
    },
  });

  const providerParameters: UserContextType = {
    currentUser,
    setCurrentUser,
  };
  return (
    <UserContext.Provider value={providerParameters}>
      {children}
    </UserContext.Provider>
  );
};
