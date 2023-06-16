import React from "react";
import {
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";

export const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent style={{ color: "black" }}>
          <ModalHeader
            fontSize={"30px"}
            display={"flex"}
            justifyContent={"center"}
          >
            {user?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir={'column'}
           justifyContent={"space-between"} alignItems={'center'}>
            <Image
              borderRadius={"full"}
              boxSize={"150px"}
              src={user?.profile}
              alt={"user-profile"}
              marginBottom={'20px'}
            />
            <Text fontSize={'18px'}>
             {user?.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button  mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
