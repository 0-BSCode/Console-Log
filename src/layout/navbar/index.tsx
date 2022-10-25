import { ReactNode, ReactElement } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  chakra,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useAuthContext } from "src/context/authContext";
import { PartialUser } from "types/user";
import { useRouter } from "next/router";

const NavLink = ({ children }: { children: ReactNode }): ReactElement => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

const Navbar = (): ReactElement => {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const { currUser, signOut } = useAuthContext();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <Button
            fontSize={20}
            fontWeight={"bold"}
            variant={"link"}
            color={"purple.400"}
            onClick={() => {
              router.push("/notes");
            }}
            _hover={{
              color: colorMode === "light" ? "black" : "white",
            }}
          >
            {"CONSOLE LOG"}
          </Button>
          {/* <chakra.h3
            fontWeight={"bold"}
            fontSize={20}
            textTransform={"uppercase"}
            color={"purple.400"}
          >
            {"Console Log"}
          </chakra.h3> */}
        </Box>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar
                    size={"2xl"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </Center>
                <br />
                <Center>
                  <p>{currUser?.username}</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    router.push("/profile");
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    e.preventDefault();
                    signOut.execute();
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
