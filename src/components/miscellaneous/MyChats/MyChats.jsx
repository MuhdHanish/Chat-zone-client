import React, { useEffect, useState } from "react";
import { ChatState } from "../../../context/ChatProvider";
import { showToast } from "../../../utils";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import axios from "../../../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { getSender } from "../../../config/chatLogic";
import { GroupChatModal, ChatLoading } from "..";

export const MyChats = ({fetchAgain}) => {
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState()
  const [loggedUser, setLoggedUser] = useState();
  const toast = useToast();
  const fetchChats = async() =>{
    try{
     const config ={
      headers:{
        Authorization: `Bearer ${user.token}`
      }
     }
     const {data} = await axios.get(`/chat`,config)
     setChats(data.chats)
    }catch(err){
      showToast(toast,"Error Occured!")
    }
  };
  useEffect(()=>{
   setLoggedUser(JSON.parse(localStorage.getItem('userInfo')).user);
   fetchChats();
   return ()=>{

   }
  },[fetchAgain])
  return (
    <Box
      display={{
        base: selectedChat ? "none" : "flex",
        md: "flex",
      }}
      flexDir={"column"}
      alignItems={"center"}
      p={3}
      bg={"rgba(18, 18, 18, 0.8)"}
      w={{base:"100%",md:"31%"}}
      borderRadius={"lg"}
      border={"1px solid rgba(255, 255, 255, 0.5)"}
      borderWidth={"1px"}
    >
      <Box
        pb={3}
        px={3}
        
        fontSize={"20px"}
        display={"flex"}
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        Chats
        <GroupChatModal>
        <Button
          display={"flex"}
          fontSize={"15px"}
          marginLeft={1}
          rightIcon={<FontAwesomeIcon icon={faPlusCircle} />}
        >
          New Group
        </Button>
        </GroupChatModal>
      </Box>
      <Box
        display={"flex"}
        flexDir={"column"}
        p={3}
        bg={"rgba(18, 18, 18, 0.8)"}
        w={"100%"}
        h={"100%"}
        borderRadius={"lg"}
        border={"1px solid rgba(255, 255, 255, 0.5)"}
        overflowY={"hidden"}
      >
        {chats.length ? (
          <Stack>
            {chats?.map((chat, index) => (
              <Box
                key={index}
                onClick={() => setSelectedChat(chat)}
                cursor={"pointer"}
                fontSize={"18px"}
                bg={
                  selectedChat === chat
                    ? "linear-gradient(90.21deg, rgba(170, 54, 124, 0.5) -5.91%, rgba(74, 47, 189, 0.5) 111.58%)"
                    : "#E8E8E8"
                }
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={3}
                borderRadius={"lg"}
              >
                <Text>
                  { 
                !chat?.isGroupChat?(
                   getSender(loggedUser,chat?.users)
                 ):(
                  chat?.chatName
                  )}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};
