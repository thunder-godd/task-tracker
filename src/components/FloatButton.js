import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const FloatButton = ({ onClick }) => {
  return (
    <Box
      sx={{
        "& > :not(style)": { m: 1 },
        position: "absolute",
        bottom: 3,
        right: 3,
        zIndex: "tooltip",
      }}>
      <Fab size="medium" color="primary" aria-label="add" onClick={onClick}>
        <AddIcon />
      </Fab>
    </Box>
  );
};
export default FloatButton;
