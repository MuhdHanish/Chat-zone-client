
const showToast = (
 toast,
 message,
 status = "error",
 duration = 3000,
 position = "bottom") => {
 toast({
  title: message,
  status: status,
  duration: duration,
  isClosable: true,
  position: position,
 });
};

export default showToast;