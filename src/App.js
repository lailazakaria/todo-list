import { useRef, useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const handleAddTodo = () => {
    const text = inputRef.current.value.trim();
    if (text) {
      const newItem = { id: Date.now(), completed: false, text };
      setTodos([...todos, newItem]);
      inputRef.current.value = "";
      localStorage.setItem("todos", JSON.stringify([...todos, newItem]));
    }
  };

  const handleItemDone = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleDeleteItem = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="App">
      <h2>ToDo List</h2>
      <div className="to-do-container">
        <ul>
          {todos.map(({ id, text, completed }) => (
            <div className="item" key={id}>
              <li
                className={completed ? "done" : ""}
                onClick={() => handleItemDone(id)}
              >
                {text}
              </li>
              <span onClick={() => handleDeleteItem(id)} className="trash">
                ❌
              </span>
            </div>
          ))}
        </ul>
        <input ref={inputRef} placeholder="Enter item..." />
        <div className="btn">
          <button onClick={handleAddTodo}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default App;
