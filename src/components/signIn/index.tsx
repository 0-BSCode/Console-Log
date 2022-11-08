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
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuthContext } from "src/context/authContext";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const SignIn = ({
  setHasAccount,
}: {
  setHasAccount: Dispatch<SetStateAction<boolean>>;
}): ReactElement => {
  const { signIn } = useAuthContext();
  const [findUserParams, setFindUserParams] = useState<PartialUser>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const disableButton =
    !findUserParams.email.length || !findUserParams.password.length;

  return (
    <Flex
      minH={"100vh"}
      minW={"100vw"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to start writing✍
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={findUserParams.email}
                onChange={(e) => {
                  setFindUserParams({
                    ...findUserParams,
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
                  value={findUserParams.password}
                  onChange={(e) => {
                    setFindUserParams({
                      ...findUserParams,
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
                  signIn.execute({ ...findUserParams });
                }}
              >
                Sign in
              </Button>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"baseline"}
                justify={"center"}
              >
                <div>
                  <Text display={"inline"} fontSize={"sm"}>
                    No account yet?{" "}
                  </Text>
                  <Button
                    fontSize={"sm"}
                    variant={"link"}
                    onClick={() => {
                      setHasAccount(false);
                    }}
                  >
                    Sign up
                  </Button>
                </div>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignIn;
