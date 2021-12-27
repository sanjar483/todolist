import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function TodoEdit() {
  const navigate = useNavigate();

  const [todo, setTodo] = useState(null);
  const [value, setValue] = useState("");

  const { id } = useParams();
  console.log(id);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const updateTodo = async () => {
    const { data } = await axios.put(`http://localhost:3333/todos/${id}`, {
      ...todo,
      title: value,
    });
    console.log(data);
    // setTodo(data);
    // setValue(data.title);

    navigate("/");
  };

  const deleteTodo = async () => {
    await axios.delete(`http://localhost:3333/todos/${id}`);
    navigate("/");
  };

  useEffect(() => {
    async function getTodo() {
      const { data } = await axios.get(`http://localhost:3333/todos/${id}`);
      setTodo(data);
      setValue(data.title);
    }

    getTodo();
  }, []);

  return (
    todo && (
      <div className="container edit-form">
        <input type="text" value={value} onChange={handleChange} />
        <div>
          <button className="dark-btn" onClick={updateTodo}>
            update
          </button>
          <button className="dark-btn" onClick={deleteTodo}>
            remove
          </button>
        </div>
      </div>
    )
  );
}

export default TodoEdit;
