import React, { useState, useEffect } from "react";
import { Container, Paper, Tab, Tabs, Box } from "@mui/material";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import TodoList from "./components/TodoList";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          margin: "20px",
          padding: "20px",
          outline: "2px solid rgb(189, 213, 241)",
          borderRadius: "4px",
        }}
      >
        <Box
          sx={{ width: { xs: "100%", md: "30%" }, marginRight: { md: "20px" } }}
        >
          <Paper>
            <UserList users={users} onUserSelect={handleUserSelect} />
          </Paper>
        </Box>
        <Box sx={{ width: { xs: "100%", md: "70%" } }}>
          <Paper>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="User Details" />
              <Tab label="To-Dos" />
            </Tabs>
            {tabValue === 0 && <UserDetails user={selectedUser} />}
            {tabValue === 1 && <TodoList userId={selectedUser?.id} />}
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
