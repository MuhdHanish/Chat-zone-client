import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { ChatState } from "../context/ChatProvider";
import { ChatBox, MyChats, SideDrawer } from "../components/miscellaneous";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain,setFetchAgain] = useState(false);
  return (
    <>
      {user ? (
        <Box width="100%">
          {user && <SideDrawer />}
          <Flex justifyContent="space-between" height="91.5vh" p="10px">
            {user && <MyChats fetchAgain={fetchAgain} />}
            {user && (
              <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            )}
          </Flex>
        </Box>
      ) : ({})
    }
    </>
  );
};

export default ChatPage;
