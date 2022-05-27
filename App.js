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
  const [tasks, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  //create task
  const addTodo = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTodos([...tasks, data]);

    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTodo = { id, ...task };
    // setTodos([...tasks, newTodo]);
  };
  //get tasks
  useEffect(() => {
    const getTodos = async () => {
      const tasksFromServer = await fetchTodos();
      setTodos(tasksFromServer);
    };

    getTodos();
  }, []);
  const fetchTodos = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };
  //get task
  const fetchTodo = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };
  //update task
  const updateTodo = async (id) => {
    const taskToUpdate = await fetchTodo(id);
    const updTodo = { ...taskToUpdate, complete: !taskToUpdate.complete };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updTodo),
    });
    const data = await res.json();

    setTodos(
      tasks.map((task) =>
        task.id === id ? { ...task, complete: data.complete } : task
      )
    );
  };
  //delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTodos(tasks.filter((task) => task.id !== id));
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
            {tasks.length > 0 ? (
              <Todos
                tasks={tasks}
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
