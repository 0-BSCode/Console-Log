import React, { ReactElement } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  VStack,
  chakra,
  HStack,
} from "@chakra-ui/react";
import query, { QueryResults } from "./query";
import { useQuery } from "@apollo/client";
import useCustomToast from "src/components/_hooks/useCustomToast";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  onChange: (topicId: string) => void;
  topicIds: string[];
}

const TopicsFilterModal = ({
  isOpen,
  onClose,
  onChange,
  topicIds,
}: Props): ReactElement => {
  const toast = useCustomToast();

  const { data, loading } = useQuery<QueryResults>(query, {
    fetchPolicy: "network-only",
  });

  const topics = data?.topics || [];
  const selectedTopics =
    topics.filter((topic) => topicIds.includes(topic.id)) || [];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Topics Filter</ModalHeader>
        <ModalBody>
          <VStack spacing={4}>
            <VStack alignItems={"flex-start"} w={"full"}>
              <chakra.p fontWeight={"semibold"}>Selected Topics</chakra.p>
              <HStack spacing={2} wrap={"wrap"} w={"full"}>
                {selectedTopics.length ? (
                  selectedTopics.map((topic) => (
                    <chakra.p
                      key={topic.id}
                      color={"white"}
                      bgColor={"purple.400"}
                      py={2}
                      px={4}
                      borderRadius={"lg"}
                    >
                      {topic.name}
                    </chakra.p>
                  ))
                ) : (
                  <chakra.p w={"full"} textAlign={"center"} color={"gray"}>
                    No topics selected yet
                  </chakra.p>
                )}
              </HStack>
            </VStack>
            <VStack alignItems={"flex-start"} w={"full"}>
              <chakra.p fontWeight={"semibold"}>Your Topics</chakra.p>
              <HStack spacing={2} wrap={"wrap"}>
                {topics.length ? (
                  topics.map((topic) => (
                    <Button
                      key={topic.id}
                      onClick={() => onChange(topic.id)}
                      colorScheme={
                        topicIds.includes(topic.id) ? "purple" : "gray"
                      }
                    >
                      {topic.name}
                    </Button>
                  ))
                ) : (
                  <chakra.p>{"You don't have any topics yet"}</chakra.p>
                )}
              </HStack>
            </VStack>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="purple"
            mr={3}
            // disabled={deleteNoteMutationState.loading}
            onClick={onClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TopicsFilterModal;
