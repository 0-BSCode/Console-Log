import { useToast } from "@chakra-ui/react";

interface ToastProps {
  description: string;
  status: "success" | "info" | "warning" | "error";
}

const useCustomToast = () => {
  const toast = useToast();
  // types are: "success", "info", "warning", "error"

  const addToast = (props: ToastProps) => {
    toast({
      description: props.description,
      status: props.status,
      position: "top-right",
      isClosable: true,
      duration: 3000,
    });
  };

  return { addToast };
};

export default useCustomToast;
