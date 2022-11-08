import React, { ReactElement, useState, useEffect } from "react";
import {
  Button,
  Box,
  chakra,
  Flex,
  Icon,
  SimpleGrid,
  useColorModeValue,
  HStack,
  FormControl,
  InputGroup,
  Input,
  IconButton,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiFilter,
  FiRefreshCw,
  FiSearch,
} from "react-icons/fi";
import NotesCard from "../note/Card";
import { useAuthContext } from "src/context/authContext";
import query, { QueryResults, QueryVariables } from "./query";
import { useQuery } from "@apollo/client";
import { PartialNote } from "types/note";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import TopicsFilterModal from "../TopicsFilterModal";
import useCustomToast from "src/components/_hooks/useCustomToast";

const NotesTable = (): ReactElement => {
  const toast = useCustomToast();
  const router = useRouter();
  const { currUser } = useAuthContext();

  const searchText: string = (router?.query?.searchText as string) || "";
  const page = Number(router?.query?.page as string) || 0;
  const limit = Number(router?.query?.limit as string) || 5;
  const sortDirection: "asc" | "desc" =
    (router?.query?.sortDirection as "asc" | "desc") || "desc";

  const selectedTopicIds: string =
    (router?.query?.selectedTopicIds as string) || "";
  const [isTopicsModalOpen, setIsTopicsModalOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState({
    searchText,
    page,
    limit,
    sortDirection,
    selectedTopicIds,
  });

  const variables: QueryVariables = {
    searchText: searchParams.searchText,
    skip: Number(searchParams.page * searchParams.limit) || 0,
    limit: Number(searchParams.limit) || 5,
    sortDirection: searchParams.sortDirection || "desc",
    topicIds: searchParams.selectedTopicIds
      ? searchParams?.selectedTopicIds?.split(",")
      : [],
  };

  const { data, loading, error, fetchMore } = useQuery<
    QueryResults,
    QueryVariables
  >(query, {
    variables,
    fetchPolicy: "network-only",
    onError: (e) => {
      toast.addToast({
        description: e.message.split(":").pop(),
        status: "error",
      });
    },
  });

  useEffect(() => {
    const url = {
      pathname: router.pathname,
      query: {
        ...searchParams,
      },
    };

    router.push(url, undefined, { shallow: true });
  }, [...Object.values(searchParams)]);

  const notes: PartialNote[] = data?.notes || [];
  const notesCount = data?.notesCount;

  return (
    <>
      <TopicsFilterModal
        topicIds={searchParams.selectedTopicIds}
        isOpen={isTopicsModalOpen}
        onClose={() => {
          setIsTopicsModalOpen(false);
        }}
        onChange={(topicId: string) => {
          const selectedTopicsArr: string[] = searchParams.selectedTopicIds
            .length
            ? searchParams.selectedTopicIds.split(",")
            : [];
          let newTopicIds = [];
          if (selectedTopicIds.includes(topicId)) {
            newTopicIds = selectedTopicsArr.filter((id) => id !== topicId);
          } else {
            newTopicIds = [...selectedTopicsArr, topicId];
          }

          setSearchParams({
            ...searchParams,
            selectedTopicIds: newTopicIds.join(","),
          });
        }}
      />
      <Flex
        textAlign={"center"}
        pt={10}
        justifyContent={"center"}
        direction={"column"}
        width={"full"}
      >
        <Box width={{ base: "full", sm: "lg", lg: "xl" }} margin={"auto"}>
          <chakra.h1
            py={5}
            fontSize={48}
            fontWeight={"bold"}
            color={useColorModeValue("gray.700", "gray.50")}
          >
            {`Welcome back, ${currUser?.username}`}
          </chakra.h1>
          <chakra.h2
            margin={"auto"}
            width={"70%"}
            fontWeight={"medium"}
            color={useColorModeValue("gray.500", "gray.400")}
          >
            {"What's on your mind?"}
          </chakra.h2>
        </Box>
        <HStack
          justifyContent={"flex-end"}
          mx={"100"}
          pt={"5"}
          alignItems={"flex-end"}
        >
          <FormControl>
            <InputGroup>
              <InputLeftElement>
                <FiSearch color={"gray.300"} />
              </InputLeftElement>
              <Input
                type={"text"}
                placeholder={"Search for note title"}
                value={searchParams.searchText}
                onChange={(e) => {
                  setSearchParams({
                    ...searchParams,
                    searchText: e.target.value,
                  });
                  fetchMore({ variables });
                }}
              />
            </InputGroup>
          </FormControl>

          <IconButton
            aria-label={"Reverse ordering"}
            icon={<FiRefreshCw />}
            onClick={() => {
              if (searchParams.sortDirection === "asc") {
                setSearchParams({
                  ...searchParams,
                  sortDirection: "desc",
                });
              } else {
                setSearchParams({
                  ...searchParams,
                  sortDirection: "asc",
                });
              }
            }}
          />
          <IconButton
            aria-label={"Topics filter"}
            colorScheme={"purple"}
            icon={<FiFilter />}
            onClick={() => {
              setIsTopicsModalOpen(true);
            }}
          />
        </HStack>
        <SimpleGrid
          columns={{ base: 1, xl: 2 }}
          spacing={"20"}
          mt={16}
          mx={"auto"}
        >
          <Button
            maxW={"640px"}
            variant={"outline"}
            borderWidth={"4px"}
            borderStyle={"dashed"}
            p={10}
            aria-label="Toggle Color Mode"
            borderColor={useColorModeValue("gray.300", "gray.400")}
            color={useColorModeValue("gray.400", "white")}
            bg={useColorModeValue("white.400", "gray.900")}
            _focus={{ boxShadow: "none" }}
            _hover={{
              borderColor: "purple.400",
              color: "purple.400",
            }}
            display={"flex"}
            width={"full"}
            height={"100%"}
            onClick={() => {
              router.push("/notes/create");
            }}
          >
            <AddIcon fontSize={"lg"} color={"inherit"} />
          </Button>
          {!!notes.length &&
            notes.map((note, index) => (
              <NotesCard {...note} index={index} key={note.id} />
            ))}
        </SimpleGrid>
        <HStack spacing={3} justifyContent={"center"} mt={10}>
          <IconButton
            aria-label={"Move back"}
            icon={<FiArrowLeft />}
            onClick={() => {
              setSearchParams({
                ...searchParams,
                page: searchParams.page - 1,
              });
            }}
            disabled={searchParams.page === 0}
          />
          <IconButton
            aria-label={"Move forward"}
            icon={<FiArrowRight />}
            onClick={() => {
              setSearchParams({
                ...searchParams,
                page: searchParams.page + 1,
              });
            }}
            disabled={
              (searchParams.page + 1) * searchParams.limit >= notesCount
            }
          />
        </HStack>
        <Box>
          <Icon viewBox="0 0 40 35" mt={14} boxSize={10} color={"purple.400"}>
            <path
              fill={"currentColor"}
              d="M10.7964 5.04553e-07C8.66112 -0.000123335 6.57374 0.632971 4.79827 1.81922C3.0228 3.00547 1.63898 4.69158 0.82182 6.66433C0.00466116 8.63708 -0.209132 10.8079 0.207477 12.9021C0.624087 14.9964 1.65239 16.9201 3.16233 18.4299L19.1153 34.3828C19.2395 34.5074 19.3871 34.6062 19.5496 34.6736C19.7121 34.741 19.8863 34.7757 20.0622 34.7757C20.2381 34.7757 20.4123 34.741 20.5748 34.6736C20.7373 34.6062 20.8848 34.5074 21.0091 34.3828L36.962 18.4272C38.9319 16.3917 40.0228 13.6636 39.9996 10.8311C39.9764 7.99858 38.8409 5.28867 36.838 3.28573C34.835 1.28279 32.1251 0.147283 29.2926 0.124081C26.4601 0.100879 23.732 1.19184 21.6965 3.1617L20.0622 4.79337L18.4305 3.1617C17.4276 2.15892 16.237 1.36356 14.9267 0.821064C13.6163 0.278568 12.2119 -0.000433066 10.7937 5.04553e-07H10.7964Z"
            />
          </Icon>
        </Box>
      </Flex>
    </>
  );
};

export default NotesTable;
