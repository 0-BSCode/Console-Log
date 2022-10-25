import { ReactElement, useState } from "react";
import {
  Container,
  chakra,
  Flex,
  SimpleGrid,
  Stack,
  StackDivider,
  useColorModeValue,
  Image,
  Button,
  Spinner,
} from "@chakra-ui/react";
import {
  BsPerson,
  BsMailbox,
  BsJournalText,
  BsPencil,
  BsTrash,
} from "react-icons/bs";
import ProfileInformation from "./Information";
import { useAuthContext } from "src/context/authContext";
import { useQuery } from "@apollo/client";
import query, { QueryResults } from "./query";
import UpdateTopicModal from "./UpdateTopicModal";

const UserProfile = (): ReactElement => {
  const { currUser } = useAuthContext();
  const [selectedTopicId, setSelectedTopicId] = useState<string>("");
  const [isTopicModalOpen, setIsTopicModalOpen] = useState<boolean>(false);

  const { data, loading, error, fetchMore } = useQuery<QueryResults>(query, {
    fetchPolicy: "network-only",
  });

  const topics = data?.topics || [];
  const topicCount = data?.topic_count || 0;

  if (loading) return <Spinner />;

  return (
    <>
      <UpdateTopicModal
        isOpen={isTopicModalOpen}
        onClose={() => {
          fetchMore({});
          setIsTopicModalOpen(false);
        }}
        topic={topics.filter((topic) => topic.id === selectedTopicId)[0]}
      />
      <Container
        maxW="5xl"
        mx={"auto"}
        py={5}
        px={{ base: 2, sm: 12, md: 17 }}
        justifyContent={"center"}
      >
        <chakra.h1
          textAlign={"center"}
          fontSize={"4xl"}
          py={10}
          fontWeight={"bold"}
        >
          Your Profile
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 5, lg: 8 }}>
          <Stack spacing={5}>
            <ProfileInformation
              title={"Username"}
              stat={currUser?.username}
              icon={<BsPerson size={"3em"} />}
            />
            <ProfileInformation
              title={"Email"}
              stat={currUser?.email}
              icon={<BsMailbox size={"3em"} />}
            />
            <Button
              width={"md"}
              py={7}
              px={4}
              fontSize={"md"}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
            >
              Edit
            </Button>
          </Stack>
          <Flex>
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={
                "https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              }
              objectFit={"cover"}
            />
          </Flex>
        </SimpleGrid>
        <Stack spacing={3}>
          <Stack
            pt={10}
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <chakra.h6 fontSize={"2xl"} fontWeight={"bold"}>
              Topics ({topicCount})
            </chakra.h6>
          </Stack>
          <Stack direction={"row"}>
            {topics?.map((topic) => (
              <Button
                key={topic.id}
                px={8}
                bg={"purple.400"}
                color={"white"}
                rounded={"md"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                fontWeight={"medium"}
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  setIsTopicModalOpen(true);
                }}
              >
                {topic.name}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default UserProfile;
