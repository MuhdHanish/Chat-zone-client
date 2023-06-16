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
      bg={
        "linear-gradient(90.21deg, rgba(170, 54, 124, 0.5) -5.91%, rgba(74, 47, 189, 0.5) 111.58%)"
      }
      cursor={"pointer"}
      onClick={handleFunction}
    >
      {user.name}
      <FontAwesomeIcon style={{marginLeft:"5px"}} icon={faXmarkCircle} />
    </Box>
  );
};
