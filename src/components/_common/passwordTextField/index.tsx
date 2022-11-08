import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";

interface Props {
  label: string;
  value: string;
  onChange: (password: string) => void;
  isInvalid?: boolean;
}

const PasswordTextField = ({
  label,
  value,
  onChange,
  isInvalid,
}: Props): ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          isInvalid={isInvalid}
        />
        <InputRightElement h={"full"}>
          <Button
            variant={"ghost"}
            onClick={() => setShowPassword((showPassword) => !showPassword)}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

export default PasswordTextField;
