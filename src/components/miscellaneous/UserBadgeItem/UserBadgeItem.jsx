import { Box } from '@chakra-ui/react'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

export const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      px={2}
      py={1}
      borderRadius={"lg"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      m={1}
      mb={2}
      fontSize={17}
      color={"white"}
      bg={
        "black"
      }
      cursor={"pointer"}
      onClick={handleFunction}
    >
      {user.name}
      <FontAwesomeIcon style={{marginLeft:"5px"}} icon={faXmarkCircle}  />
    </Box>
  );
};
