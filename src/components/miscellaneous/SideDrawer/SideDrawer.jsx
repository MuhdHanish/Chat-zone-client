import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Box, Button,  Flex,  Text, Tooltip } from "@chakra-ui/react";

export const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loding, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  return (
    <Flex 
    justifyContent={'space-between'}
    bg={'white'}
    alignItems={'center'}
    p={'5px 10px 5px 10px'}
    >
      <Tooltip label="Search Users"  hasArrow placement="bottom-end">
        <Button variant={"unstyle"} color={'white'}>
          <FontAwesomeIcon icon={faSearch} size="md" className="" />
         <Text d={{base:'none',md:'flex'}} px={'3'}>
          Search Users
         </Text>
        </Button>
      </Tooltip>
    </Flex>
  );
};
