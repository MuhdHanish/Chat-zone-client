import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
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
import { ChatState } from "../../../context/ChatProvider";
import { showToast } from "../../../utils";
import React, { useRef, useState } from "react";
import { UserBadgeItem, UserListItem } from "..";
import axios from "../../../api/axios";

export const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const search = useRef("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const toast = useToast();
  const handleRemove = async (removeUser) => {
    if (
      selectedChat.groupAdmin._id !== user._id &&
      removeUser._id !== user._id
    ) {
      return showToast(toast, "Only admin can remove");
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/groupremove`,
        {
          chatId: selectedChat._id,
          userId: removeUser._id,
        },
        config
      );
      removeUser._id === user._id
        ? setSelectedChat()
        : setSelectedChat(data.removed);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (err) {}
  };
  const renameHandler = async () => {
    if (!groupChatName) {
      showToast(toast, "Set a group name");
      return;
    }
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChat(data.updatedChat);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (rerr) {
      showToast(toast, "Error occured");
    }
    setGroupChatName("");
  };
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
  const handleAddUser = async (userToAdd) => {
    if (selectedChat.users.find((user) => user._id === userToAdd._id)) {
      return showToast(toast, "User already exist");
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      return showToast(toast, "Only admin can add");
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/addtogroup`,
        {
          chatId: selectedChat._id,
          userId: userToAdd._id,
        },
        config
      );
      setSelectedChat(data.added);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (err) {
      showToast(toast, "Error occured");
    }
  };
  return (
    <>
      <IconButton onClick={onOpen} icon={<ViewIcon />} />
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setSearchResult([]);
          onClose();
        }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent style={{ color: "black" }}>
          <ModalHeader
            fontSize={"30px"}
            display={"flex"}
            justifyContent={"center"}
          >
            {selectedChat?.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w={"100%"} display={"flex"} flexWrap={"wrap"} pb={3}>
              {selectedChat?.users.map((user, index) => (
                <UserBadgeItem
                  key={index}
                  user={user}
                  handleFunction={() => handleRemove(user)}
                />
              ))}
            </Box>
            <FormControl display={"flex"}>
              <Input
                placeholder="Group name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant={"outline"}
                ml={1}
                isLoading={renameLoading}
                onClick={renameHandler}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users"
                mb={1}
                ref={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
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
                    functionHandler={() => handleAddUser(user)}
                  />
                ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              variant={"outline"}
              onClick={() => handleRemove(user)}
              color={"red"}
            >
              Leave
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
