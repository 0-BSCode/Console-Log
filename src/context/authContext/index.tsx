import { Context, createContext, ReactElement, useContext } from "react";
import { PartialUser } from "types/user";
import useCurrentUser from "./hooks/useCurrentUser";
import useSignUp, { SignUpHookResults } from "./hooks/useSignUp";
import useSignOut, { SignOutHookResults } from "./hooks/useSignOut";
import useSignIn, { SignInHookResults } from "./hooks/useSignIn";

export interface AuthContextType {
  currUser?: PartialUser;
  signUp?: SignUpHookResults;
  signOut?: SignOutHookResults;
  signIn?: SignInHookResults;
}

export const AuthContext: Context<AuthContextType> =
  createContext<AuthContextType>({});

export const AuthProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const currUser = useCurrentUser();
  const signUp = useSignUp({ currentUser: currUser });
  const signOut = useSignOut({ currentUser: currUser });
  const signIn = useSignIn({ currentUser: currUser });

  const providerParameters: AuthContextType = {
    currUser: currUser.get(),
    signUp,
    signOut,
    signIn,
  };
  return (
    <AuthContext.Provider value={providerParameters}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
