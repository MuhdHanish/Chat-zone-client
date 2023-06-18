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
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../../../config/chatLogic";
import { ProfileModal, ScrollableChat, UpdateGroupChatModal } from "..";
import axios from "../../../api/axios";
import { showToast } from "../../../utils";
import { io } from "socket.io-client";
import "./SingleChat.css";


const ENDPOINT = process.env.REACT_APP_BASE_URL;
let socket, selectedChatCompare;

export const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState([]);
  const { user, selectedChat, setSelectedChat ,notification,setNotification } = ChatState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
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
      socket.emit("join chat", selectedChat?._id);
    } catch (err) {
      showToast(toast, "Error occured");
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare?._id !== newMessageRecieved?.chat?._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([...notification,newMessageRecieved])
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const sendMessage = async () => {
    if (!newMessage) {
      return;
    }
    try {
      socket.emit("stop typing", selectedChat?._id);
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
      socket.emit("new message", data.sentedMessage);
      setMessages([...messages, data.sentedMessage]);
    } catch (err) {
      return showToast(toast, "Error occured");
    }
  };

  const typingHandler = (event) => {
    setNewMessage(event.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat?._id);
    }
    const lastTypingTime = new Date().getTime();
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= 2000 && typing) {
        socket.emit("stop typing", selectedChat?._id);
        setTyping(false);
      }
    }, 2000);
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
              <>
                {
                  <div className="messages">
                    <ScrollableChat messages={messages} isTyping={isTyping} />
                  </div>
                }
              </>
            )}
            <FormControl isRequired mt={3}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                gap={2}
                position={"relative"}
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
