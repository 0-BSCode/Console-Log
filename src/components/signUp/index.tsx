import React, { ReactElement, useState, Dispatch, SetStateAction } from "react";
import { PartialUser } from "types/user";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import { useAuthContext } from "src/context/authContext";

const SignIn = ({
  setHasAccount,
}: {
  setHasAccount: Dispatch<SetStateAction<boolean>>;
}): ReactElement => {
  const { signUp } = useAuthContext();
  const [createUserParams, setCreateUserParams] = useState<PartialUser>({
    username: "",
    email: "",
    password: "",
  });

  return (
    <Box maxW={"md"} borderWidth={"1px"} borderRadius={"lg"} padding={"30px"}>
      <Text>REGISTER</Text>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          sx={{ marginBottom: "1rem" }}
          type="text"
          value={createUserParams.username}
          onChange={(e) => {
            setCreateUserParams({
              ...createUserParams,
              username: e.target.value,
            });
          }}
        />
        <FormLabel>Email address</FormLabel>
        <Input
          sx={{ marginBottom: "1rem" }}
          type="email"
          value={createUserParams.email}
          onChange={(e) => {
            setCreateUserParams({
              ...createUserParams,
              email: e.target.value,
            });
          }}
        />
        <FormLabel>Password</FormLabel>
        <Input
          sx={{ marginBottom: "1rem" }}
          type="password"
          value={createUserParams.password}
          onChange={(e) => {
            setCreateUserParams({
              ...createUserParams,
              password: e.target.value,
            });
          }}
        />
        <Button
          onClick={() => {
            signUp.execute({ ...createUserParams });
          }}
        >
          Register
        </Button>
      </FormControl>
      <Text display={"inline"}>Already have an account?</Text>
      <Button
        variant={"link"}
        onClick={() => {
          setHasAccount(true);
        }}
      >
        Sign in
      </Button>
    </Box>
  );
};

export default SignIn;
