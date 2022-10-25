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
import { PartialUser } from "types/user";
import mutation, { MutationResults, MutationVariables } from "./mutation";

interface UpdateTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: PartialUser;
}

const UpdateProfileModal = ({
  isOpen,
  onClose,
  user,
}: UpdateTopicModalProps): ReactElement => {
  const [editProfileParams, setEditProfileParams] = useState<PartialUser>({
    id: user?.id || "",
    username: user?.username || "",
    email: user?.email || "",
  });

  const [updateProfileMutation, updateProfileMutationState] = useMutation<
    MutationResults,
    MutationVariables
  >(mutation, {
    onCompleted: () => {
      onClose();
    },
  });

  const loading = updateProfileMutationState.loading;

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
                  value={editProfileParams.username}
                  onChange={(e) => {
                    setEditProfileParams({
                      ...editProfileParams,
                      username: e.target.value,
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
                  value={editProfileParams.email}
                  onChange={(e) => {
                    setEditProfileParams({
                      ...editProfileParams,
                      email: e.target.value,
                    });
                  }}
                />
              </InputGroup>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter justifyContent={"space-between"}>
          <HStack spacing={3}>
            <Button colorScheme="gray" disabled={loading} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              disabled={loading}
              onClick={() => {
                updateProfileMutation({
                  variables: {
                    username: editProfileParams.username || "",
                    email: editProfileParams.email || "",
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

export default UpdateProfileModal;
