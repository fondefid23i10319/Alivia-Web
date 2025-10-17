import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment-timezone";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";

import { useAppSelector } from "../../../../../hooks/redux";
import useSocket from "../../../../../hooks/useSocket";
import { selectId } from "../../../../../features/auth/selectors";

import { getChatMessagesRequest } from "../../../../../api/chat/get";

type Message = {
  id: number;
  content: string;
  createdAt: string;
  roomID: string | number;
  sender: {
    id: number;
    name: string;
    last_name?: string;
    profile_picture?: string | null;
  };
};

const userTz = "America/Santiago";

function Messages({ chatId }: { chatId: number }) {
  const myId = useAppSelector(selectId);
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["chat-messages", myId, chatId],
    queryFn: () => getChatMessagesRequest(myId, chatId),
  });

  const { joinRoom, leaveRoom, sendMessage, on, off } = useSocket();

  const [message, setMessage] = useState("");
  const handleSendMessage = () => {
    if (message.trim() === "") {
      return;
    }

    sendMessage("send_message", { roomId: chatId, text: message });
    setMessage("");
  };

  useEffect(() => {
    const onNewMessage = (payload: any) => {
      const message = {
        id: payload.id,
        content: payload.content,
        roomID: payload.roomID,
        createdAt: payload.createdAt,
        sender: {
          id: payload.sender?.id,
          first_name: payload.sender.name,
          last_name: payload.sender.last_name,
          image: payload.sender.profile_picture,
        },
      };

      const roomId = String(message.roomID);

      if (roomId === String(chatId)) {
        queryClient.setQueryData(["chat-messages", myId, chatId], (old: any[] | undefined) => {
          if (!old) return [message];
          const exists = old.some((m) => String(m.id) === String(message.id));
          if (exists) return old;
          return [...old, message];
        });
      }
      queryClient.setQueryData(["chats", myId, chatId], (old: any[] | undefined) => {
        if (!old) return old;
        return old.map((chat) => {
          if (String(chat.id) !== String(roomId)) return chat;
          return {
            ...chat,
            lastMessage: message.content,
            lastMessageDate: message.createdAt,
            unreadCount: (chat.unreadCount || 0) + (message.sender?.id === myId ? 0 : 1),
          };
        });
      });
      queryClient.invalidateQueries({
        queryKey: ["unread-chat-messages", myId],
      });
    };
    on("new_message", onNewMessage);
    return () => off("new_message", onNewMessage);
  }, [on, off]);

  useEffect(() => {
    joinRoom(chatId);
    sendMessage("mark_as_read", { roomId: chatId });
    return () => {
      leaveRoom(chatId);
    };
  }, [joinRoom, leaveRoom, sendMessage]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", height: "70vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const formattedMessages = data.map(
    (message: {
      id: number;
      content: string;
      createdAt: string;
      roomID: string;
      sender: {
        id: number;
        first_name: string;
        last_name: string;
        image: string;
      };
    }) => ({
      id: message.id,
      content: message.content,
      createdAt: message.createdAt,
      roomID: message.roomID,
      sender: {
        id: message.sender.id,
        name: message.sender.first_name,
        last_name: message.sender.last_name,
        profile_picture: message.sender.image,
      },
    })
  );

  return (
    <Box display="flex" flexDirection="column" height="70vh">
      <Box sx={{ overflowY: "auto", flex: 1, p: 2 }}>
        {formattedMessages.map((m: Message) => {
          const isMine = m.sender.id === myId;
          return (
            <Box key={m.id} display="flex" sx={{ justifyContent: isMine ? "flex-end" : "flex-start" }} mb={2}>
              <Box
                sx={{
                  bgcolor: isMine ? "#4476B533" : "#F1F1F1",
                  color: isMine ? "white" : "black",
                  p: 1.5,
                  borderRadius: 2,
                  width: "70%",
                }}
              >
                {!isMine ? (
                  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                    <Avatar>{m.sender.name.charAt(0)}</Avatar>
                    <Stack direction="column" spacing={0.5}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {m.sender.name}
                      </Typography>
                      <Typography variant="body2" mb={2} display="flex" flexWrap="wrap" textAlign="justify">
                        {m.content}
                      </Typography>
                    </Stack>
                  </Stack>
                ) : (
                  <Typography variant="body2" mb={2} display="flex" flexWrap="wrap" textAlign="justify">
                    {m.content}
                  </Typography>
                )}
                <Box display="flex" justifyContent={"flex-end"}>
                  <Typography variant="caption">
                    {" "}
                    {moment(m.createdAt).tz(userTz).locale("es").fromNow()}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ p: 2, borderTop: "1px solid rgba(0,0,0,0.06)", display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          multiline
          maxRows={3}
          size="small"
          placeholder="Escribe un mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
        />
        <IconButton color="primary" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Messages;
