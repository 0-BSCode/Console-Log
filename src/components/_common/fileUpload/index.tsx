import {
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Icon,
} from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";
import { Control, useController } from "react-hook-form";
import { Dispatch, SetStateAction, useRef } from "react";

export type FormValue = {
  file_: FileList;
};

interface Props {
  fileUpload: File;
  setFileUpload: Dispatch<SetStateAction<File>>;
  control: Control<FormValue>;
  name?: string;
  placeholder?: string;
  acceptedFileTypes?: string;
  label?: string;
  isRequired?: boolean;
}

export const FileUpload = ({
  fileUpload,
  setFileUpload,
  name,
  placeholder,
  acceptedFileTypes,
  control,
  label,
  isRequired,
}: Props) => {
  const inputRef = useRef();
  const {
    field: { ref, onChange, value, ...inputProps },
    fieldState: { invalid, isTouched, isDirty },
  } = useController<FormValue>({
    name,
    control,
    rules: { required: isRequired },
  });

  return (
    <FormControl isInvalid={invalid} isRequired>
      <FormLabel htmlFor="writeUpFile">{label}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FiFile} />
        </InputLeftElement>
        <input
          type="file"
          onChange={(e) => setFileUpload(e.target.files[0])}
          accept={acceptedFileTypes}
          name={name}
          ref={inputRef}
          {...inputProps}
          style={{ display: "none" }}
        />
        <Input
          placeholder={placeholder || "Your file ..."}
          onClick={() => {
            inputRef.current.click();
          }}
          readOnly={true}
          value={(fileUpload && fileUpload.name) || ""}
        />
      </InputGroup>
      <FormErrorMessage>{invalid}</FormErrorMessage>
    </FormControl>
  );
};

FileUpload.defaultProps = {
  acceptedFileTypes: "",
  allowMultipleFiles: false,
};

export default FileUpload;
