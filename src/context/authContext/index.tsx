import {
  Context,
  createContext,
  ReactElement,
  useContext,
  useState,
  useEffect,
} from "react";
import { PartialUser } from "types/user";
import useCurrentUser from "./hooks/useCurrentUser";
import useSignUp, { SignUpHookResults } from "./hooks/useSignUp";
import useSignOut, { SignOutHookResults } from "./hooks/useSignOut";
import useSignIn, { SignInHookResults } from "./hooks/useSignIn";
import useRedirectRoute, { RouteGuardHookResults } from "./hooks/useRouteGuard";

export interface AuthContextType {
  initializing?: boolean;
  currUser?: PartialUser;
  currRoute?: RouteGuardHookResults;
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
  const [initializing, setInitializing] = useState<boolean>(true);
  const currUser = useCurrentUser();
  const currRoute = useRedirectRoute({ currentUser: currUser });
  const signUp = useSignUp({ currentUser: currUser });
  const signOut = useSignOut({ currentUser: currUser });
  const signIn = useSignIn({ currentUser: currUser });

  useEffect(() => {
    if (!currUser.state.loading) {
      setInitializing(false);
    }
  }, [currUser]);

  const providerParameters: AuthContextType = {
    initializing,
    currUser: currUser.get(),
    currRoute,
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
