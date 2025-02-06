import React, { useState } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  InputBase,
  IconButton,
  Box,
  Typography,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const UserList = ({ users, onUserSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const usersPerPage = 10;

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  return (
    <Paper
      sx={{
        width: 280,
        height: "100vh",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{ p: 2, position: "sticky", top: 0, bgcolor: "#f8f9fa", zIndex: 1 }}
      >
        <Typography variant="h5" component="h2">
          User List
        </Typography>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            border: "1px solid #e0e0e0",
            mb: 2,
            mt: 3,
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Paper>
      </Box>
      <Box sx={{ overflowY: "auto", flex: 1 }}>
        <List sx={{ width: "100%", bgcolor: "transparent" }}>
          {paginatedUsers.map((user) => (
            <ListItem key={user.id} disablePadding>
              <ListItemButton onClick={() => onUserSelect(user)}>
                <ListItemText primary={`${user.firstName} ${user.lastName}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ p: 2 }}>
        <Pagination
          count={Math.ceil(filteredUsers.length / usersPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </Box>
    </Paper>
  );
};

export default UserList;
