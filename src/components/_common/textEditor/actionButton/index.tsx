import React, { ReactElement } from "react";
import { IconButton } from "@chakra-ui/react";

interface Props {
  isActive: boolean;
  label: string;
  icon: ReactElement;
  onClick: () => boolean;
  bgColor?: string;
}

const ActionButton = ({ isActive, label, icon, onClick, bgColor }: Props) => {
  return (
    <IconButton
      colorScheme={bgColor ? "" : "purple"}
      bgColor={bgColor || isActive ? "purple.700" : "purple.400"}
      aria-label={label}
      icon={icon}
      onClick={onClick}
    />
  );
};

export default ActionButton;
