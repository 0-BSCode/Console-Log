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

  useEffect(() => {
    if (router.isReady) {
      // No user session seen
      if (currentUser.state.error) {
        router.push("/");
      }
    }
  }, [currentUser.state.error, router.isReady]);

  return {
    get: () => currRoute,
    set: (route: string) => setCurrentRoute(route),
  };
};

export default useRouteGuard;
