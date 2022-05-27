import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
const AddTask = ({ onAdd, showForm }) => {
  const [title, setTitle] = useState("");
  const [complete, setComplete] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      alert("please add title");
      return;
    }
    onAdd({ title, complete });
    setTitle("");
    setComplete("");
    showForm(!showForm);
  };

  return (
    <form noValidate autoComplete="off" onSubmit={onSubmit}>
      <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
        <TextField
          sx={{
            bgcolor: "background.secondary",
            input: { color: "text.secondary" },
          }}
          size="small"
          label="Title"
          placeholder="New Task"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Box>
    </form>
  );
};

export default AddTask;
