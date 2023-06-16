import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, {  useRef, useState } from "react";
import { showToast } from "../../../utils";
import { ChatState } from "../../../context/ChatProvider";
import axios from "../../../api/axios";
import { UserListItem, UserBadgeItem } from "..";

export const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const search = useRef("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResult([]);
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/users?search=${search.current.value}`,
        config
      );
      setLoading(false);
      if (query !== search.current.value) {
        return;
      }
      setSearchResult(data.users);
    } catch (err) {
      showToast(toast, "Failed to load");
    }
  };
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      showToast(toast, "Please fill all feilds");
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((user) => user._id)),
        },
        config
      );
      setChats([data.fullGroupChat, ...chats]);
      onClose();
      showToast(toast, "New group created", "success");
    } catch (err) {
     showToast(toast, err.response.data.message);
    }
  };

  const handleDelete = (deleteUser) => {
    setSelectedUsers(
      selectedUsers.filter((user) => user._id !== deleteUser._id)
    );
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      showToast(toast, "User already added", "warning");
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent style={{ color: "black" }}>
          <ModalHeader
            fontSize={"30px"}
            display={"flex"}
            justifyContent={"center"}
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"}>
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users"
                mb={1}
                ref={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w={"100%"} display={"flex"} flexWrap={"wrap"}>
              {selectedUsers?.map((user, index) => (
                <UserBadgeItem
                  key={index}
                  user={user}
                  handleFunction={() => handleDelete(user)}
                />
              ))}
            </Box>
            {loading ? (
              <Spinner m="auto" display={"flex"} />
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user, index) => (
                  <UserListItem
                    key={index}
                    user={user}
                    isTrue
                    functionHandler={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
