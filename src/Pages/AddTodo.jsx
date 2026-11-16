import TodoForm from "../Components/TodoForm.jsx";
import { createTodo } from "../api.js";

export default function AddTodo() {
  return (
    <section>
      <h2>Add to-do</h2>
      <TodoForm submitLabel="Add to-do" onSubmit={createTodo} />
    </section>
  );
}