import React from "react";
import type { ChatProps } from "../../interfaces";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";

import Messages from "./components/Messages";

function ChatRoom({ chat }: { chat: ChatProps | undefined }) {
  return (
    <Paper
      elevation={1}
      sx={{
        borderRadius: "20px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      {typeof chat === "undefined" ? (
        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          justifyContent="center"
          alignItems="center"
          height="80vh"
          p={2}
        >
          <Typography variant="h6">No hay un chat seleccionado</Typography>
          <Typography variant="body2">
            Por favor seleccione uno de los chats para iniciar una conversación
          </Typography>
        </Box>
      ) : (
        <React.Fragment>
          <Box
            display="flex"
            justifyContent="start"
            bgcolor="#FAFAFA"
            p={2}
            sx={{
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar>{chat.profile ? chat.profile : chat.is_private ? <PersonIcon /> : <GroupIcon />}</Avatar>
              <Stack direction="column" spacing={0.5}>
                <Typography variant="body1" fontWeight="bold">
                  {chat.name}
                </Typography>
                {!chat.is_private && (
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Typography variant="body2">Tú, </Typography>
                    {chat.members.length === 2 ? (
                      chat.members.map((member: { id: number; name: string }, index: number) => (
                        <React.Fragment key={index}>
                          <Typography variant="body2">{member.name}</Typography>
                          {index < chat.members.length - 2 ? (
                            <Typography variant="body2">,</Typography>
                          ) : (
                            <Typography variant="body2">y</Typography>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <React.Fragment>
                        <Typography variant="body2">{chat.members[0].name},</Typography>
                        <Typography variant="body2">{chat.members[1].name},</Typography>
                        <Typography variant="body2">y {chat.members.length - 2} más</Typography>
                      </React.Fragment>
                    )}
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Box>
          <Messages chatId={chat.id} />
        </React.Fragment>
      )}
    </Paper>
  );
}

export default ChatRoom;
