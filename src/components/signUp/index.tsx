import React, { ReactElement, useState, Dispatch, SetStateAction } from "react";
import { PartialUser } from "types/user";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useAuthContext } from "src/context/authContext";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const SignUp = ({
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
  const [showPassword, setShowPassword] = useState(false);

  const disableButton =
    !createUserParams.username.length ||
    !createUserParams.email.length ||
    !createUserParams.password.length;

  return (
    <>
      <Flex
        minH={"100vh"}
        minW={"100vw"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} width={"30%"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}> Sign up </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
            minW={"100%"}
          >
            <Stack spacing={4}>
              <FormControl id="text">
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={createUserParams.username}
                  onChange={(e) => {
                    setCreateUserParams({
                      ...createUserParams,
                      username: e.target.value,
                    });
                  }}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={createUserParams.email}
                  onChange={(e) => {
                    setCreateUserParams({
                      ...createUserParams,
                      email: e.target.value,
                    });
                  }}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={createUserParams.password}
                    onChange={(e) => {
                      setCreateUserParams({
                        ...createUserParams,
                        password: e.target.value,
                      });
                    }}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={2}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  isDisabled={disableButton}
                  onClick={() => {
                    signUp.execute({ ...createUserParams });
                  }}
                >
                  Sign up
                </Button>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"baseline"}
                  justify={"center"}
                >
                  <div>
                    <Text display={"inline"} fontSize={"sm"}>
                      Already a user?{" "}
                    </Text>
                    <Button
                      fontSize={"sm"}
                      variant={"link"}
                      onClick={() => {
                        setHasAccount(true);
                      }}
                    >
                      Sign in
                    </Button>
                  </div>
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default SignUp;
