import Avatar from "@mui/material/Avatar";
import InputAdornment from "@mui/material/InputAdornment";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";

import type { ChatProps } from "../interfaces";

function ChatList({
  selectedChatId,
  onSelectChatId,
  searchQuery,
  setSearchQuery,
  chats,
}: {
  selectedChatId: number;
  onSelectChatId: (_: React.MouseEvent<HTMLDivElement, MouseEvent>, id: number) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  chats: Array<ChatProps>;
}) {
  const individualChats = chats.filter((chat: ChatProps) => chat.is_private);
  const groupChats = chats.filter((chat: ChatProps) => !chat.is_private);
  return (
    <Paper
      elevation={1}
      sx={{
        my: 1,
        py: 3,
        px: 2,
        borderRadius: "20px",
        width: "100%",
        height: "80vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <TextField
        fullWidth
        placeholder="Escribe el nombre del archivo..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
        variant="outlined"
        sx={{
          "& .MuiOutlinedInput-root": { borderRadius: "24px", backgroundColor: "#F7F7F7" },
        }}
      />
      <Typography variant="subtitle2" fontWeight="bold" mt={2}>
        Chats
      </Typography>

      {individualChats.length > 0 ? (
        <List disablePadding dense>
          {individualChats.map((chat: ChatProps, index: number) => (
            <ListItem disablePadding key={index}>
              <ListItemButton
                selected={selectedChatId === chat.id}
                onClick={(event) => onSelectChatId(event, chat.id)}
                sx={{
                  "&.Mui-selected, &.Mui-selected:hover": {
                    backgroundColor: "#4476B51A",
                    borderRadius: "4px",
                    "& .MuiAvatar-root": {
                      boxShadow: (theme: any) => `0 0 0 2px ${theme.palette.primary.light}`,
                    },
                  },
                }}
              >
                <ListItemAvatar>
                  {chat.profile ? (
                    <Avatar alt={`${chat.name}`} src={chat.profile} />
                  ) : (
                    <Avatar>
                      <PersonIcon />
                    </Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={chat.name}
                  secondary={chat.lastMessage}
                  slotProps={{
                    primary: { variant: "subtitle2" },
                    secondary: { variant: "body2" },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography textAlign="center" variant="body2" fontWeight="bold">
          No hay chats individuales
        </Typography>
      )}
      <Typography variant="subtitle2" fontWeight="bold" mt={2}>
        Grupos
      </Typography>
      {groupChats.length > 0 ? (
        <List disablePadding dense>
          {groupChats.map((chat: ChatProps, index: number) => (
            <ListItem disablePadding key={index}>
              <ListItemButton
                selected={selectedChatId === chat.id}
                onClick={(event) => onSelectChatId(event, chat.id)}
                sx={{
                  "&.Mui-selected, &.Mui-selected:hover": {
                    backgroundColor: "#4476B51A",
                    borderRadius: "4px",
                    "& .MuiAvatar-root": {
                      boxShadow: (theme: any) => `0 0 0 2px ${theme.palette.primary.light}`,
                    },
                  },
                }}
              >
                <ListItemAvatar>
                  {chat.profile ? (
                    <Avatar alt={`${chat.name}`} src={chat.profile} />
                  ) : (
                    <Avatar>
                      <GroupIcon />
                    </Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={chat.name}
                  secondary={chat.lastMessage}
                  slotProps={{
                    primary: { variant: "subtitle2" },
                    secondary: { variant: "body2" },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography textAlign="center" variant="body2" fontWeight="bold">
          No hay chats grupales
        </Typography>
      )}
    </Paper>
  );
}

export default ChatList;
