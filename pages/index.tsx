import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useAuthContext } from "src/context/authContext";
import { useRouter } from "next/router";
import PageHeader from "src/components/_common/pageHeader";
import SignIn from "src/components/signIn";
import SignUp from "src/components/signUp";
import { Center } from "@chakra-ui/react";

const Home: NextPage = () => {
  const router = useRouter();
  const [hasAccount, setHasAccount] = useState<boolean>(true);

  const { currUser } = useAuthContext();

  useEffect(() => {
    console.log("CURR USER FROM DASHBOARD");
    console.log(currUser);
    if (currUser) {
      router.push("/dashboard");
    }
  }, [currUser]);

  console.log("HAS ACCOUNT");
  console.log(hasAccount);

  return (
    <Center flexDir={"column"} height={"100vh"}>
      <PageHeader />

      {hasAccount ? (
        <SignIn setHasAccount={setHasAccount} />
      ) : (
        <SignUp setHasAccount={setHasAccount} />
      )}
    </Center>
  );
};

export default Home;

/*
OBSTACLE
1. User authentication upon resource request
  - way to authenticate user whenever the request a resource

*/
