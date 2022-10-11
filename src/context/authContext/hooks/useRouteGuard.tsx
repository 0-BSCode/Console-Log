import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CurrentUserHookResult } from "./useCurrentUser";

interface RouteGuardHookProps {
  currentUser: CurrentUserHookResult;
}

export interface RouteGuardHookResults {
  get: () => string;
  set: (route: string) => void;
}

const useRouteGuard = ({
  currentUser,
}: RouteGuardHookProps): RouteGuardHookResults => {
  const router = useRouter();
  const [currRoute, setCurrentRoute] = useState<string>("/notes");

  // Notes last page user loaded into before being redirected to log in
  useEffect(() => {
    if (router.route !== "/") {
      setCurrentRoute(router.route);
    }
  }, []);

  useEffect(() => {
    // No user session seen
    if (currentUser.state.error) router.push("/");
    // User has been fetched
    else if (!currentUser.state.loading && currentUser.state.data)
      router.push(currRoute);
  }, [currentUser.state.error, currentUser.state.loading]);

  return {
    get: () => currRoute,
    set: (route: string) => setCurrentRoute(route),
  };
};

export default useRouteGuard;
