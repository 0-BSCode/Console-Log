import React, { ReactElement, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  CheckboxGroup,
  Checkbox,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";
import mutation, { MutationVariables, MutationResults } from "./mutation";
import query, { QueryResults } from "./query";
import useCustomToast from "src/components/_hooks/useCustomToast";

export interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTopics: string[];
  onChange: (topicId: string) => void;
}

const TopicsModal = ({
  isOpen,
  onClose,
  selectedTopics,
  onChange,
}: CreateNoteModalProps): ReactElement => {
  const toast = useCustomToast();
  const [topicName, setTopicName] = useState<string>("");

  const { data, loading, error, fetchMore } = useQuery<QueryResults>(query, {
    fetchPolicy: "network-only",
  });

  const [createTopicMutation, createTopicMutationState] = useMutation<
    MutationResults,
    MutationVariables
  >(mutation, {
    onCompleted: () => {
      toast.addToast({
        description: "Successfully created topic",
        status: "success",
      });
      setTopicName("");
      fetchMore({});
    },
  });

  const topics = data?.topics || [];
  const isLoading = loading || createTopicMutationState.loading;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Topics</ModalHeader>
        <ModalBody>
          <FormControl isDisabled={isLoading}>
            <FormLabel>Name</FormLabel>
            <div style={{ display: "flex", columnGap: "10px" }}>
              <InputGroup>
                <Input
                  type={"text"}
                  placeholder={"Name of your new topic"}
                  value={topicName}
                  onChange={(e) => {
                    setTopicName(e.target.value);
                  }}
                />
              </InputGroup>
              <Button
                variant={"solid"}
                colorScheme={"blue"}
                disabled={isLoading || !topicName.length}
                onClick={() => {
                  createTopicMutation({
                    variables: {
                      name: topicName,
                      description: "",
                    },
                  });
                }}
              >
                Create
              </Button>
            </div>
            <br />

            <Text>Topics</Text>
            <Stack
              spacing={5}
              direction={["column", "row"]}
              wrap={"wrap"}
              alignItems={"center"}
            >
              {topics?.map((topic) => (
                <Button
                  my={4}
                  key={topic.id}
                  onClick={() => onChange(topic.id)}
                  colorScheme={
                    selectedTopics.includes(topic.id) ? "purple" : "gray"
                  }
                >
                  {topic.name}
                </Button>
              ))}
            </Stack>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TopicsModal;
