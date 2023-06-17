import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../../context/ChatProvider";
import { ProfileModal } from "../ProfileModal/ProfileModal";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../utils";
import axios from "../../../api/axios";
import "./SideDrawer.css";
import { ChatLoading, UserListItem } from "..";

export const SideDrawer = () => {
  const { user, setSelectedChat, chats, setChats} = ChatState();
  const navigae = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const toast = useToast();

  const searchHandler = async () => {
    if (!search) {
      showToast(toast, "Please enter to search", "warning");
    } else {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(`/users?search=${search}`, config);
        setLoading(false);
        setSearchResult(data.users);
      } catch (error) {
        showToast(toast, "Error Occured!");
      }
    }
  };
  const accessChat =async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type":"application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const {data} = await axios.post(`/chat`,{userId},config);
      if(!chats.find((chat)=>chat._id===data.chat._ids))setChats([data.chat,...chats])
      setSelectedChat(data.chat)
      setLoadingChat(false);
      onClose();
    } catch (err) {
       showToast(toast, "Error On fetching chat");
    }
  };
  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    navigae("/");
  };

  return (
    <>
      <Flex
        justifyContent={"space-between"}
        bg={"rgba(18, 18, 18, 0.8)"}
        alignItems={"center"}
        p={"5px 10px 5px 10px"}
        
      >
        <Tooltip label="Search Users" hasArrow placement="bottom-end">
          <Button
            variant
            _hover={{
              color: "black",
              backgroundColor: "white",
              transition: "1s",
            }}
            color={"white"}
            onClick={() => onOpen()}
          >
            <FontAwesomeIcon
              icon={faSearch}
              style={{ marginBottom: "2px" }}
              className=""
            />
            <Text d={{ base: "none", md: "flex" }} px={"3"}>
              Search Users
            </Text>
          </Button>
        </Tooltip>
        <div>
          <span className="tagline">Chat - Zone</span>
        </div>
        <Box>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={"2xl"} m={1} />
            </MenuButton>
            <MenuList></MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size={"sm"}
                cursor={"pointer"}
                name={user?.name}
                src={user?.profile}
              />
            </MenuButton>
            <MenuList style={{ color: "black" }}>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logOutHandler}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent style={{ backgroundColor: "rgba(18, 18, 18,0.9)" }}>
            <DrawerHeader padding={4} marginLeft={10} fontSize={"16px"}>
              Search Users
            </DrawerHeader>
            <DrawerBody>
              <Flex pb={2}>
                <Input
                  placeholder="Search by name - email"
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button  onClick={searchHandler}>Go</Button>
              </Flex>
              {loading ? (
                <ChatLoading />
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user?._id}
                    user={user}
                    functionHandler={() => accessChat(user?._id)}
                  />
                ))
              )}
              {loadingChat && <Spinner ml="auto" display={"flex"} />}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
