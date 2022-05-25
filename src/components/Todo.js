import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Todo = ({ todo, onDelete, onUpdate }) => {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        height: 70,
        bgcolor: "background.main",
        mb: 1,
      }}>
      <CardContent>
        <Typography sx={{ color: "background.secondary" }}>
          {todo.title}
        </Typography>
      </CardContent>
      <CardActions>
        <Checkbox
          sx={{
            color: "background.secondary",
            "&.Mui-checked": {
              color: "background.secondary",
            },
          }}
          onChange={() => onUpdate(todo.id)}
        />
        <Button onClick={() => onDelete(todo.id)} size="small">
          <DeleteIcon sx={{ color: "background.secondary" }} />
        </Button>
      </CardActions>
    </Card>
  );
};
export default Todo;
