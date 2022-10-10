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

const SignUp = ({
  setHasAccount,
}: {
  setHasAccount: Dispatch<SetStateAction<boolean>>;
}): ReactElement => {
  const { signIn } = useAuthContext();
  const [findUserParams, setFindUserParams] = useState<PartialUser>({
    email: "",
    password: "",
  });
  return (
    <Box maxW={"md"} borderWidth={"1px"} borderRadius={"lg"} padding={"30px"}>
      <Text>LOG IN</Text>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          sx={{ marginBottom: "1rem" }}
          type="email"
          value={findUserParams.email}
          onChange={(e) => {
            setFindUserParams({
              ...findUserParams,
              email: e.target.value,
            });
          }}
        />
        <FormLabel>Password</FormLabel>
        <Input
          sx={{ marginBottom: "1rem" }}
          type="password"
          value={findUserParams.password}
          onChange={(e) => {
            setFindUserParams({
              ...findUserParams,
              password: e.target.value,
            });
          }}
        />
        <Button
          onClick={() => {
            signIn.execute({ ...findUserParams });
          }}
        >
          Sign in
        </Button>
      </FormControl>
      <Text display={"inline"}>No account yet?</Text>
      <Button
        variant={"link"}
        onClick={() => {
          setHasAccount(false);
        }}
      >
        Sign up
      </Button>
    </Box>
  );
};

export default SignUp;
