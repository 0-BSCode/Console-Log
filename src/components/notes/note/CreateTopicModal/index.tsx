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
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import mutation, { MutationVariables, MutationResults } from "./mutation";

export interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTopicModal = ({
  isOpen,
  onClose,
}: CreateNoteModalProps): ReactElement => {
  const [topicName, setTopicName] = useState<string>("");

  const [createTopicMutation, createTopicMutationState] = useMutation<
    MutationResults,
    MutationVariables
  >(mutation, {
    onCompleted: (data) => {
      console.log(`Created new topic ${data.newTopic.name}`);
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>

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
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>

          <Button
            colorScheme="blue"
            mr={3}
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateTopicModal;
