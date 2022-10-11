import type { NextPage } from "next";
import { useState } from "react";
import PageHeader from "src/components/_common/pageHeader";
import SignIn from "src/components/signIn";
import SignUp from "src/components/signUp";
import { Center } from "@chakra-ui/react";

const Home: NextPage = () => {
  const [hasAccount, setHasAccount] = useState<boolean>(true);

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
