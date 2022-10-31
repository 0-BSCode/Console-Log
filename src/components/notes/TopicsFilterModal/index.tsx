import React, { ReactElement, useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import query, { QueryResults } from "./query";
import { useQuery } from "@apollo/client";
import useCustomToast from "src/components/_hooks/useCustomToast";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const TopicsFilterModal = ({ isOpen, onClose }: Props): ReactElement => {
  const toast = useCustomToast();

  const { data, loading } = useQuery<QueryResults>(query, {
    fetchPolicy: "network-only",
  });

  console.log("TOPICS");
  console.log(data);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Note</ModalHeader>
        <ModalBody>Are you sure you want to delete this?</ModalBody>

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
