import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import "./AuthVarification.css";
import Login from "../Login/Login";

const AuthVarification = () => {
  const selectedBg =
    "linear-gradient(90.21deg, rgba(170, 54, 124, 0.5) -5.91%, rgba(74, 47, 189, 0.5) 111.58%)";
  return (
    <section className="auth-form">
      <Box
        bg={"transparent"}
        className="form"
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Tabs variant="soft-rounded">
          <TabList className="tab-list">
            <Tab className="tabs-inside" _selected={{ bg: selectedBg }}>
              Log In
            </Tab>
            <Tab className="tabs-inside" _selected={{ bg: selectedBg }}>
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
            <Login/>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </section>
  );
};

export default AuthVarification;
