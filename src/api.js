const BASE_URL = "http://localhost:3000/todos";

async function request(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.status === 204 ? null : res.json();
}

const json = (method, body) => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const getTodos = () => request(BASE_URL);
export const getTodo = (id) => request(`${BASE_URL}/${id}`);
export const createTodo = (todo) => request(BASE_URL, json("POST", todo));
export const updateTodo = (id, todo) => request(`${BASE_URL}/${id}`, json("PUT", todo));
export const patchTodo = (id, changes) => request(`${BASE_URL}/${id}`, json("PATCH", changes));
export const deleteTodo = (id) => request(`${BASE_URL}/${id}`, { method: "DELETE" });