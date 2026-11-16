import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import TodoList from "./pages/TodoList.jsx";
import AddTodo from "./pages/AddTodo.jsx";
import EditTodo from "./pages/EditTodo.jsx";

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>To-do manager</h1>
        <nav>
          <NavLink to="/todos">All to-dos</NavLink>
          <NavLink to="/add-todo">Add to-do</NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/todos" replace />} />
          <Route path="/todos" element={<TodoList />} />
          <Route path="/add-todo" element={<AddTodo />} />
          <Route path="/edit-todo/:id" element={<EditTodo />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>
    </div>
  );
}