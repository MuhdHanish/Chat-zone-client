import React, { useEffect, useState } from "react";
import { ChatState } from "../../../context/ChatProvider";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../../../config/chatLogic";
import { ProfileModal, ScrollableChat, UpdateGroupChatModal } from "..";
import axios from "../../../api/axios";
import { showToast } from "../../../utils";
import "./SingleChat.css"

export const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState([]);
  const { user, selectedChat, setSelectedChat } = ChatState();
  const toast = useToast();

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/message/${selectedChat?._id}`, config);
      setMessages(data.fetchedMessages);
      setLoading(false);
    } catch (err) {
      showToast(toast, "Error occured");
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);
  const sendMessage = async () => {
    if (!newMessage) {
      return;
    }
    try {
      setNewMessage("");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/message`,
        {
          content: newMessage,
          chatId: selectedChat._id,
        },
        config
      );
      setMessages([...messages, data.sentedMessage]);
    } catch (err) {
      return showToast(toast, "Error occured");
    }
  };
  const typingHandler = (event) => {
    setNewMessage(event.target.value);
    // typing indicator logic
  };
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={"25px"}
            pb={3}
            px={2}
            w={"100%"}
            display={"flex"}
            justifyContent={{ base: "space-between" }}
            alignItems={"center"}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => {
                setFetchAgain(!fetchAgain);
                setSelectedChat("");
              }}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-end"}
            p={3}
            bgColor={"rgba(18, 18, 18, 0.8)"}
            w={"100%"}
            h={"100%"}
            borderRadius={"lg"}
            border={"1px solid rgba(255, 255, 255, 0.5)"}
            overflow={"hidden"}
          >
            {loading ? (
              <Spinner
                size={"xl"}
                w={19}
                h={19}
                alignSelf={"center"}
                margin={"auto"}
              />
            ) : (
                <>{
                  <div className="messages">
                  <ScrollableChat messages={messages} />
                </div>}</>
            )}
            <FormControl isRequired mt={3}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                gap={2}
                alignItems={"center"}
              >
                <Input
                  bgColor={"rgba(18, 18, 18, 0.8)"}
                  placeholder="Type a message"
                  onChange={typingHandler}
                  value={newMessage}
                />
                {newMessage.length > 0 ? (
                  <Button onClick={sendMessage}>Send</Button>
                ) : (
                  ""
                )}
              </Box>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          h={"100%"}
        >
          <Text fontSize={"2xl"} pb={3}>
            Select your chat
          </Text>
        </Box>
      )}
    </>
  );
};
