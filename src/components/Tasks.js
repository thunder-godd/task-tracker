import Task from "./Task";

const Tasks = ({ tasks, onDelete, onUpdate }) => {
  return (
    <>
      {console.log(tasks)}
      {tasks.map((task, index) => (
        <Task key={index} task={task} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </>
  );
};

export default Tasks;
