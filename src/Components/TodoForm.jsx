import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TodoForm({ initial, submitLabel, onSubmit }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [status, setStatus] = useState(initial?.status ?? "pending");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Enter a title for the to-do.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await onSubmit({ title: title.trim(), status });
      navigate("/todos");
    } catch (err) {
      setError(err.message + ". Check that json-server is running on port 3001.");
      setSaving(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. book dentist appointment"
          autoFocus
        />
      </label>

      <label>
        Status
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      {error && <p className="error">{error}</p>}

      <div className="actions">
        <button type="submit" className="btn primary" disabled={saving}>
          {saving ? "Saving…" : submitLabel}
        </button>
        <button type="button" className="btn" onClick={() => navigate("/todos")}>
          Cancel
        </button>
      </div>
    </form>
  );
}