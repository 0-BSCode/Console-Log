import React, { ReactElement, useState, useEffect } from "react";
import { useRouter } from "next/router";
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
  VStack,
  chakra,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { PartialTopic } from "types/topic";
import DeleteTopicMutation, {
  DeleteTopicMutationResults,
  DeleteTopicMutationVariables,
} from "./mutations/deleteTopicMutation";
import EditTopicMutation, {
  EditTopicMutationResults,
  EditTopicMutationVariables,
} from "./mutations/updateTopicMutation";

interface UpdateTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: PartialTopic;
}

const UpdateTopicModal = ({
  isOpen,
  onClose,
  topic,
}: UpdateTopicModalProps): ReactElement => {
  const [editTopicParams, setEditTopicParams] = useState<PartialTopic>({
    id: topic?.id || "",
    name: topic?.name || "",
    description: topic?.description || "",
  });

  const [deleteTopicMutation, deleteTopicMutationState] = useMutation<
    DeleteTopicMutationResults,
    DeleteTopicMutationVariables
  >(DeleteTopicMutation, {
    onCompleted: () => {
      onClose();
    },
  });

  const [editTopicMutation, editTopicMutationState] = useMutation<
    EditTopicMutationResults,
    EditTopicMutationVariables
  >(EditTopicMutation, {
    onCompleted: () => {
      onClose();
    },
  });

  useEffect(() => {
    if (topic) {
      setEditTopicParams({
        name: topic.name,
        description: topic.description,
      });
    }
  }, [topic]);

  const loading =
    deleteTopicMutationState.loading || editTopicMutationState.loading;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <chakra.p fontSize={"lg"}>Update Topic</chakra.p>
        </ModalHeader>
        <ModalBody>
          <VStack spacing={3}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <InputGroup>
                <Input
                  type={"text"}
                  value={editTopicParams.name}
                  onChange={(e) => {
                    setEditTopicParams({
                      ...editTopicParams,
                      name: e.target.value,
                    });
                  }}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <InputGroup>
                <Input
                  type={"text"}
                  value={editTopicParams.description}
                  onChange={(e) => {
                    setEditTopicParams({
                      ...editTopicParams,
                      description: e.target.value,
                    });
                  }}
                />
              </InputGroup>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter justifyContent={"space-between"}>
          <Button
            variant="ghost"
            onClick={() => {
              deleteTopicMutation({
                variables: {
                  topicId: topic.id,
                },
              });
            }}
            colorScheme={"red"}
            disabled={loading}
          >
            Delete
          </Button>

          <HStack spacing={3}>
            <Button colorScheme="gray" disabled={loading} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              disabled={loading}
              onClick={() => {
                editTopicMutation({
                  variables: {
                    topicId: topic?.id,
                    name: editTopicParams.name,
                    description: editTopicParams.description,
                  },
                });
              }}
            >
              Update
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateTopicModal;
