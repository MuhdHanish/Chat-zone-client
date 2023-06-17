import React from 'react'
import { ChatState } from '../../../context/ChatProvider'
import { Box } from '@chakra-ui/react';
import { SingleChat } from '..';

export const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems={"center"}
      flexDir={"column"}
      p={3}
      bgColor={"rgba(18, 18, 18, 0.8)"}
      w={{ base: "100%", md: "68%" }}
      borderRadius={"lg"}
      border={"1px solid rgba(255, 255, 255, 0.5)"}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

