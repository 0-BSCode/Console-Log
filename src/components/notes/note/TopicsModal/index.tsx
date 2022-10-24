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
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@apollo/client";
import mutation, { MutationVariables, MutationResults } from "./mutation";
import query, { QueryResults } from "./query";

export interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTopics: string[];
  onChange: (newValues: string[]) => void;
}

const TopicsModal = ({
  isOpen,
  onClose,
  selectedTopics,
  onChange,
}: CreateNoteModalProps): ReactElement => {
  const [topicName, setTopicName] = useState<string>("");

  const { data, loading, error, fetchMore } = useQuery<QueryResults>(query, {
    fetchPolicy: "network-only",
  });

  const [createTopicMutation, createTopicMutationState] = useMutation<
    MutationResults,
    MutationVariables
  >(mutation, {
    onCompleted: (data) => {
      console.log(`Created new topic ${data.newTopic.name}`);
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
            <CheckboxGroup
              colorScheme="blue"
              defaultValue={selectedTopics}
              onChange={onChange}
            >
              <Stack
                spacing={[5, 5]}
                direction={["column", "row"]}
                wrap={"wrap"}
              >
                {topics?.map((topic) => (
                  <Checkbox key={topic.id} value={topic.id}>
                    {topic.name}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
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
