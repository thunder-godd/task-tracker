import Todo from "./Todo";

const Todos = ({ todos, onDelete, onUpdate }) => {
  return (
    <>
      {console.log(todos)}
      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </>
  );
};

export default Todos;
