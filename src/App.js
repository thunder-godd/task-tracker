import { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import theme from "./assets/styles";
import "./App.css";
import Header from "./components/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";
import FloatButton from "./components/FloatButton";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  //create todo
  const addTodo = async (todo) => {
    const res = await fetch("http://https://salty-thicket-80808.herokuapp.com//todos", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(todo),
    });
    const data = await res.json();
    setTodos([...todos, data]);

    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTodo = { id, ...todo };
    // setTodos([...todos, newTodo]);
  };
  //get todos
  useEffect(() => {
    const getTodos = async () => {
      const todosFromServer = await fetchTodos();
      setTodos(todosFromServer);
    };

    getTodos();
  }, []);
  const fetchTodos = async () => {
    const res = await fetch("http://localhost:5000/todos");
    const data = await res.json();

    return data;
  };
  //get todo
  const fetchTodo = async (id) => {
    const res = await fetch(`http://localhost:5000/todos/${id}`);
    const data = await res.json();

    return data;
  };
  //update todo
  const updateTodo = async (id) => {
    const todoToUpdate = await fetchTodo(id);
    const updTodo = { ...todoToUpdate, complete: !todoToUpdate.complete };

    const res = await fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updTodo),
    });
    const data = await res.json();

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, complete: data.complete } : todo
      )
    );
  };
  //delete todo
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, { method: "DELETE" });
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container
          sx={{
            position: "relative",
            bgcolor: "background.primary",
            minHeight: "100vh",
          }}
          maxWidth="sm"
        >
          <Header />
          {showForm && <AddTodo onAdd={addTodo} showForm={setShowForm} />}
          <Box
            sx={{
              bgcolor: "background.secondary",
              minHeight: "75vh",
              maxHeight: "75vh",
              overflow: "auto",
              mt: 3,
            }}
          >
            {todos.length > 0 ? (
              <Todos
                todos={todos}
                onDelete={deleteTask}
                onUpdate={updateTodo}
              />
            ) : (
              <Typography
                variant="p"
                component="div"
                sx={{
                  mx: "auto",
                  my: "auto",
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                No Tasks to show
              </Typography>
            )}

            <FloatButton onClick={() => setShowForm(!showForm)} />
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default App;
