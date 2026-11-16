import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TodoForm from "../Components/TodoForm.jsx";
import { getTodo, updateTodo } from "../api.js";

export default function EditTodo() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getTodo(id)
      .then(setTodo)
      .catch(() => setError("That to-do doesn't exist or couldn't be loaded."));
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!todo) return <p>Loading…</p>;

  return (
    <section>
      <h2>Edit to-do</h2>
      <TodoForm
        initial={todo}
        submitLabel="Save changes"
        onSubmit={(values) => updateTodo(id, values)}
      />
    </section>
  );
}