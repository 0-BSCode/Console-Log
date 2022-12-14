import { ReactElement, useState } from "react";
import {
  Container,
  chakra,
  Flex,
  SimpleGrid,
  Stack,
  Button,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { BsPerson, BsMailbox } from "react-icons/bs";
import ProfileInformation from "./Information";
import { useQuery } from "@apollo/client";
import query, { QueryResults } from "./query";
import UpdateTopicModal from "./UpdateTopicModal";
import UpdateProfileModal from "./UpdateProfileModal";
import CircularProgress from "../_common/circularProgress";

const UserProfile = (): ReactElement => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>("");
  const [isTopicModalOpen, setIsTopicModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  const { data, loading, error, fetchMore } = useQuery<QueryResults>(query, {
    fetchPolicy: "network-only",
  });

  const currentUser = data?.currentUser;
  const topics = data?.topics || [];
  const topicCount = data?.topic_count || 0;

  if (loading) return <CircularProgress />;

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
      <UpdateProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => {
          fetchMore({});
          setIsProfileModalOpen(false);
        }}
        user={currentUser}
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
              stat={currentUser?.username}
              icon={<BsPerson size={"3em"} />}
            />
            <ProfileInformation
              title={"Email"}
              stat={currentUser?.email}
              icon={<BsMailbox size={"3em"} />}
            />
            <Button
              width={"md"}
              py={7}
              px={4}
              fontSize={"md"}
              rounded={"full"}
              bg={"purple.400"}
              color={"white"}
              _hover={{
                bg: "purple.500",
              }}
              _focus={{
                bg: "purple.500",
              }}
              onClick={() => {
                setIsProfileModalOpen(true);
              }}
            >
              Edit
            </Button>
          </Stack>
          <Flex justifyContent={"center"}>
            <Center>
              <Avatar
                size={"2xl"}
                src={currentUser?.image}
                objectFit={"none"}
              />
            </Center>
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
              {topicCount > 0 ? `Topics (${topicCount})` : "Topics"}
            </chakra.h6>
          </Stack>
          <Stack direction={"row"}>
            {topics?.length ? (
              topics?.map((topic) => (
                <Button
                  key={topic.id}
                  px={8}
                  bg={"purple.600"}
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
              ))
            ) : (
              <chakra.p textAlign={"center"}>No topics yet</chakra.p>
            )}
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default UserProfile;
