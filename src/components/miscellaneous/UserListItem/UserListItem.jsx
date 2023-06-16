import { Avatar, Box, Text } from "@chakra-ui/react";
import React from "react";

export const UserListItem = ({ user, functionHandler, isTrue }) => {
  return (
    <>
      <Box
        onClick={functionHandler}
        cursor={"pointer"}
        bgColor={
          "linear-gradient(90.21deg, rgba(170, 54, 124, 0.5) -5.91%, rgba(74, 47, 189, 0.5) 111.58%)"
        }
        border={isTrue?"black 1px solid":"1px solid rgba(255, 255, 255, 0.5)"}
        w="100%"
        display="flex"
        color={isTrue?"black":"#e2e8f0"}
        px={3}
        py={2}
        mb={2}
        borderRadius={"lg"}
        _hover={{
          bgColor: "#e2e8f0",
          color: "black",
          border: "1px solid rgba(18, 18, 18, 0.5)",
        }}
      >
        <Avatar
          mr={2}
          size={"sm"}
          cursor={"pointer"}
          name={user?.name}
          src={user?.profile}
        />
        <Box>
          <Text>{user?.name}</Text>
          <Text fontSize={"xs"}>
            <b>Email : </b>
            {user.email}
          </Text>
        </Box>
      </Box>
    </>
  );
};
