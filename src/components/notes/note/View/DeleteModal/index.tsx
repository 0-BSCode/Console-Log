import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import mutation, { MutationVariables, MutationResults } from "./mutation";
import useCustomToast from "src/components/_hooks/useCustomToast";

export interface CreateNoteModalProps {
  noteId: string;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteNoteModal = ({
  noteId,
  isOpen,
  onClose,
}: CreateNoteModalProps): ReactElement => {
  const toast = useCustomToast();
  const router = useRouter();

  const [deleteNoteMutation, deleteNoteMutationState] = useMutation<
    MutationResults,
    MutationVariables
  >(mutation, {
    onCompleted: () => {
      toast.addToast({
        description: "Note successfully deleted!",
        status: "success",
      });
      onClose();
      router.push("/notes");
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Note</ModalHeader>
        <ModalBody>Are you sure you want to delete this?</ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={deleteNoteMutationState.loading}
          >
            Cancel
          </Button>

          <Button
            colorScheme="red"
            mr={3}
            disabled={deleteNoteMutationState.loading}
            onClick={() => {
              deleteNoteMutation({
                variables: {
                  noteId,
                },
              });
            }}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteNoteModal;
