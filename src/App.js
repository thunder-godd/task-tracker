import { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import theme from "./assets/styles";
import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import FloatButton from "./components/FloatButton";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  //create task
  const addTask = async (task) => {
    const res = await fetch(
      "https://tasks-express-api.herokuapp.com/api/task",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(task),
      }
    );
    console.log(res);
    const data = await res.json();
    setTasks([...tasks, data]);
  };
  //get tasks
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);
  const fetchTasks = async () => {
    const res = await fetch("https://tasks-express-api.herokuapp.com/apitasks");
    const data = await res.json();
    console.log(data);
    return data;
  };
  //get task
  const fetchTask = async (id) => {
    const res = await fetch(
      `https://tasks-express-api.herokuapp.com/api/tasks/${id}`
    );
    const data = await res.json();

    return data;
  };
  //update task
  const updateTask = async (id) => {
    const taskToUpdate = await fetchTask(id);
    const updTask = { ...taskToUpdate, complete: !taskToUpdate.complete };

    const res = await fetch(
      `https://tasks-express-api.herokuapp.com/api/tasks/${id}`,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(updTask),
      }
    );
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, complete: data.complete } : task
      )
    );
  };
  //delete task
  const deleteTask = async (id) => {
    await fetch(`https://tasks-express-api.herokuapp.com/api/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
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
          {showForm && <AddTask onAdd={addTask} showForm={setShowForm} />}
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
              <Tasks
                tasks={tasks}
                onDelete={deleteTask}
                onUpdate={updateTask}
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
