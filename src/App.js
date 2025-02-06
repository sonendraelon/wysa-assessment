import React, { useState, useEffect } from "react";
import { Container, Paper, Tab, Tabs, Box, useMediaQuery } from "@mui/material";
import UserList from "./components/UserList";
import UserDetails from "./components/UserDetails";
import TodoList from "./components/TodoList";

function App() {
  // State to store the list of users
  const [users, setUsers] = useState([]);
  // State to store the selected user
  const [selectedUser, setSelectedUser] = useState(null);
  // State to store the current tab value
  const [tabValue, setTabValue] = useState(0);
  // Media query to check if the screen width is less than 600px
  const isMobile = useMediaQuery("(max-width:600px)");

  // Fetch the list of users when the component mounts
  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);

  // Handle user selection
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    if (isMobile) {
      setTabValue(0); // Switch to User Details tab on mobile when a user is selected
    }
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg">
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
          sx={{
            width: { xs: "100%", md: "30%" },
            marginRight: { md: "20px" },
            marginBottom: { xs: "20px", md: "0" },
          }}
        >
          <Paper elevation={3}>
            <UserList users={users} onUserSelect={handleUserSelect} />
          </Paper>
        </Box>
        <Box sx={{ width: { xs: "100%", md: "70%" } }}>
          <Paper elevation={3}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant={isMobile ? "fullWidth" : "standard"}
            >
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
