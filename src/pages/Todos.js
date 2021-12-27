import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Todos() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const addTodo = async () => {
    if (value) {
      let newTodo = {
        title: value,
      };
      const { data } = await axios.post("http://localhost:3333/todos", newTodo);
      setTodos([...todos, data]);
      setValue("");
    }
  };

  useEffect(() => {
    async function getTodos() {
      const { data } = await axios.get("http://localhost:3333/todos");
      setTodos(data);
    }

    getTodos();
  }, []);

  return (
    <div className="container">
      <div className="input-form">
        <input
          type="text"
          placeholder="What do you want to do"
          value={value}
          onChange={handleChange}
        />
        <button className="btn" onClick={addTodo}>
          add
        </button>
      </div>

      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <Link to={`/${todo.id}`}>{todo.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Todos;
