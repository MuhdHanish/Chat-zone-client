import React from 'react'
import { ChatState } from '../../../context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from "../../../config/chatLogic";
import { ProfileModal, UpdateGroupChatModal } from "..";

export const SingleChat = ({fetchAgain,setFetchAgain})=> {
 const {user,selectedChat,setSelectedChat} = ChatState(); 
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
             onClick={() => setSelectedChat("")}
           />
           {!selectedChat.isGroupChat ? (
             <>
               {getSender(user, selectedChat.users)}
               <ProfileModal user={getSenderFull(user, selectedChat.users)} />
             </>
           ) : (
             <>
               {selectedChat.chatName}
               <UpdateGroupChatModal fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
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
           {}
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
}
