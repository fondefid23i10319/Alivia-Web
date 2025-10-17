import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import ChatList from "./components/ChatList";
import ChatRoom from "./components/ChatRoom/ChatRoom";

import type { ChatProps } from "./interfaces";

import { useAppSelector } from "../../hooks/redux";
import { selectId } from "../../features/auth/selectors";
import { SocketProvider } from "../../providers/SocketProvider";

import { getChatsRequest } from "../../api/chat/get";

function Messaging() {
  const id = useAppSelector(selectId);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: chats,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["chats", id],
    queryFn: () => getChatsRequest(id),
  });

  const [selectedChatId, setSelectedChatId] = useState(-1);

  const handleListItemClick = (_: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => {
    setSelectedChatId(id);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const filteredChats = chats.filter((chat: ChatProps) => {
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const selectedChat = filteredChats.find((chat: ChatProps) => chat.id === selectedChatId);

  return (
    <React.Fragment>
      <SocketProvider>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ChatList
              selectedChatId={selectedChatId}
              onSelectChatId={handleListItemClick}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              chats={filteredChats}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <ChatRoom chat={selectedChat} />
          </Grid>
        </Grid>
      </SocketProvider>
    </React.Fragment>
  );
}

export default Messaging;
