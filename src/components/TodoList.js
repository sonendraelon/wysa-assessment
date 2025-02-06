import React, { useState, useEffect } from "react";
import {
  IconButton,
  Box,
  TextField,
  Button,
  Checkbox,
  Paper,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TodoList = ({ userId }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    if (userId) {
      fetch(`https://dummyjson.com/todos/user/${userId}`)
        .then((res) => res.json())
        .then((data) => setTodos(data.todos));
    }
  }, [userId]);

  const handleAddTodo = () => {
    if (!newTodo.trim()) return;
    const todo = {
      id: Date.now(),
      todo: newTodo,
      completed: false,
      userId,
    };
    setTodos([todo, ...todos]);
    setNewTodo("");
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: newText } : todo))
    );
  };

  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", borderRadius: 1 }}>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            fullWidth
            placeholder="Add a new to-do..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            inputProps={{ maxLength: 150 }}
            size="small"
            sx={{ bgcolor: "white" }}
          />
          <Typography
            variant="caption"
            sx={{ alignSelf: "center", color: "text.secondary" }}
          >
            {newTodo.length}/150
          </Typography>
        </Box>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 3 }}
        >
          <Button
            variant="text"
            onClick={() => setNewTodo("")}
            sx={{ color: "text.secondary" }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            onClick={handleAddTodo}
            sx={{ bgcolor: "primary.main" }}
          >
            Add To-do
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {todos.map((todo) => (
            <Paper
              key={todo.id}
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1.5,
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
              }}
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
                sx={{ mr: 1 }}
              />
              <Typography
                sx={{
                  flex: 1,
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "text.secondary" : "text.primary",
                }}
              >
                {todo.todo}
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => {
                    const newText = prompt("Edit todo:", todo.todo);
                    if (newText) handleEditTodo(todo.id, newText);
                  }}
                  sx={{ color: "text.secondary" }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteTodo(todo.id)}
                  sx={{ color: "text.secondary" }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TodoList;
