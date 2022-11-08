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
  VStack,
  chakra,
  HStack,
  FormErrorMessage,
  InputRightElement,
} from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { PartialUser } from "types/user";
import mutation, { MutationResults, MutationVariables } from "./mutation";
import useCustomToast from "src/components/_hooks/useCustomToast";
import { useForm } from "react-hook-form";
import FileUpload, { FormValue } from "src/components/_common/fileUpload";
import uploadImage from "src/_utils/uploadImage";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import PasswordTextField from "src/components/_common/passwordTextField";

interface UpdateTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: PartialUser;
}

interface ProfileInformation extends PartialUser {
  newPassword?: string;
  confirmNewPassword?: string;
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
  const [showPasswordFields, setShowPasswordFields] = useState<boolean>(false);

  const [editProfileParams, setEditProfileParams] =
    useState<ProfileInformation>({
      id: user?.id || "",
      username: user?.username || "",
      email: user?.email || "",
      password: "",
      newPassword: "",
      confirmNewPassword: "",
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
      hidePasswords();
      onClose();
    },
    onError: (e) => {
      toast.addToast({
        description: e.message.split(":").pop(),
        status: "error",
      });
    },
  });

  const resetInformation = () => {
    setEditProfileParams({
      id: user?.id || "",
      username: user?.username || "",
      email: user?.email || "",
    });
  };

  const hidePasswords = () => {
    setEditProfileParams({
      ...editProfileParams,
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setShowPasswordFields(false);
  };

  const loading = updateProfileMutationState.loading || imgUploading;
  const passwordsMatch =
    editProfileParams.newPassword === editProfileParams.confirmNewPassword;

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

            {showPasswordFields ? (
              <>
                <PasswordTextField
                  label={"Current password"}
                  value={editProfileParams.password}
                  onChange={(password: string) => {
                    setEditProfileParams({ ...editProfileParams, password });
                  }}
                />

                <PasswordTextField
                  label={"New password"}
                  value={editProfileParams.newPassword}
                  onChange={(newPassword: string) => {
                    setEditProfileParams({
                      ...editProfileParams,
                      newPassword,
                    });
                  }}
                />

                <PasswordTextField
                  label={"Confirm new password"}
                  value={editProfileParams.confirmNewPassword}
                  onChange={(confirmNewPassword: string) => {
                    setEditProfileParams({
                      ...editProfileParams,
                      confirmNewPassword,
                    });
                  }}
                  isInvalid={!passwordsMatch}
                />

                <Button variant={"ghost"} onClick={hidePasswords} w={"full"}>
                  Close
                </Button>
              </>
            ) : (
              <Button
                variant={"ghost"}
                onClick={() => setShowPasswordFields(true)}
                colorScheme={"purple"}
                w={"full"}
              >
                Edit Password
              </Button>
            )}
          </VStack>
        </ModalBody>

        <ModalFooter justifyContent={"space-between"}>
          <HStack spacing={3}>
            <Button
              colorScheme="gray"
              disabled={loading}
              onClick={() => {
                hidePasswords();
                resetInformation();
                onClose();
              }}
            >
              Close
            </Button>
            <Button
              colorScheme="blue"
              disabled={loading || !passwordsMatch}
              onClick={async () => {
                setImgUploading(true);
                const imgUrl = await uploadImage(imgUpload);
                setImgUploading(false);

                updateProfileMutation({
                  variables: {
                    username: editProfileParams.username || "",
                    email: editProfileParams.email || "",
                    image: imgUrl || "",
                    password: editProfileParams.password,
                    newPassword: editProfileParams.newPassword,
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
