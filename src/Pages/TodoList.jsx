import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteTodo, getTodos, patchTodo } from "../api.js";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch((err) =>
        setError(err.message + ". Check that json-server is running on port 3001.")
      )
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(todo) {
    if (!window.confirm(`Delete "${todo.title}"? This can't be undone.`)) return;
    try {
      await deleteTodo(todo.id);
      setTodos((prev) => prev.filter((t) => t.id !== todo.id));
    } catch (err) {
      setError(err.message);
    }
  }

  async function toggleStatus(todo) {
    const status = todo.status === "completed" ? "pending" : "completed";
    try {
      const updated = await patchTodo(todo.id, { status });
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p>Loading…</p>;

  return (
    <section>
      <h2>All to-dos</h2>
      {error && <p className="error">{error}</p>}

      {todos.length === 0 && !error ? (
        <p>
          No to-dos yet. <Link to="/add-todo">Add your first one.</Link>
        </p>
      ) : (
        <ul className="list">
          {todos.map((todo) => (
            <li key={todo.id} className={`item ${todo.status}`}>
              <div className="info">
                <span className="title">{todo.title}</span>
                <button
                  className={`badge ${todo.status}`}
                  onClick={() => toggleStatus(todo)}
                  title="Click to change status"
                >
                  {todo.status}
                </button>
              </div>
              <div className="actions">
                <Link className="btn" to={`/edit-todo/${todo.id}`}>Edit</Link>
                <button className="btn danger" onClick={() => handleDelete(todo)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}