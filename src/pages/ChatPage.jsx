import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider";
import { ChatBox, MyChats, SideDrawer } from "../components/miscellaneous";

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <Box width="100%">
      {user && <SideDrawer />}
      <Flex justifyContent="space-between" height="91.5vh" p="10px">
        {user && <MyChats />}
        {user && <ChatBox />}
      </Flex>
    </Box>
  );
};

export default ChatPage;
