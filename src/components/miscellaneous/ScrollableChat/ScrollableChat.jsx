import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../../config/chatLogic'
import { ChatState } from '../../../context/ChatProvider'
import { Avatar, Tooltip } from '@chakra-ui/react'
import animationData from "../../../animations/typing.json";
import Lottie from 'react-lottie'

export const ScrollableChat = ({ messages,isTyping }) => {
 const { user } = ChatState();
 const defaultOptions = {
   loop: true,
   autoplay: true,
   animationData: animationData,
   rendererSettings: {
     preserveAspectRatio: "xMidYMid slice",
   },
 };
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, index) => (
          <div key={index} style={{ display: "flex" }}>
            {(isSameSender(messages, message, index, user._id) ||
              isLastMessage(messages, index, user._id)) && (
              <Tooltip
                label={message?.sender?.name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt={"7px"}
                  mr={1}
                  size={"sm"}
                  cursor={"pointer"}
                  name={message?.sender?.name}
                  src={message?.sender?.profile}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  message?.sender?._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                color: "black",
                marginLeft: isSameSenderMargin(
                  messages,
                  message,
                  index,
                  user._id
                ),
                marginTop: isSameUser(messages, message, index, user._id)
                  ? 3
                  : 10,
              }}
            >
              {message?.content}
            </span>
          </div>
        ))}
      {isTyping ? (
        <Lottie
          style={{
            width:40,
            height: 20,
            borderRadius: 50,
            margin: "5px",
            marginLeft: 35,
          }}
          options={defaultOptions}
        />
      ) : (
        ""
      )}
    </ScrollableFeed>
  );
}
