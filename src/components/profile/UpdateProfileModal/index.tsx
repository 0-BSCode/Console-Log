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
  useToast,
  Icon,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { PartialUser } from "types/user";
import mutation, { MutationResults, MutationVariables } from "./mutation";
import useCustomToast from "src/components/_hooks/useCustomToast";
import { useForm } from "react-hook-form";
import FileUpload, { FormValue } from "src/components/_common/fileUpload";
import validateFiles from "src/_utils/validateFiles";
import { FiFile } from "react-icons/fi";
import uploadImage from "src/_utils/uploadImage";

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
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>();
  const toast = useCustomToast();
  const [imgUploading, setImgUploading] = useState<boolean>(false);
  const [imgUpload, setImgUpload] = useState<File>(null);

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
      toast.addToast({
        description: "Updated profile",
        status: "success",
      });
      onClose();
    },
  });

  const loading = updateProfileMutationState.loading || imgUploading;

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

            <FormControl isInvalid={!!errors.file_} isRequired>
              <FileUpload
                fileUpload={imgUpload}
                setFileUpload={setImgUpload}
                name="avatar"
                acceptedFileTypes="image/*"
                isRequired={true}
                placeholder="Your avatar"
                control={control}
                label={"Profile Picture"}
              />

              <FormErrorMessage>
                {errors.file_ && errors?.file_.message}
              </FormErrorMessage>
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
              onClick={async () => {
                setImgUploading(true);
                const imgUrl = await uploadImage(imgUpload);
                setImgUploading(false);

                updateProfileMutation({
                  variables: {
                    username: editProfileParams.username || "",
                    email: editProfileParams.email || "",
                    image: imgUrl || "",
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
