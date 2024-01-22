import axios from "axios";
import React, { useState } from "react";

const ToDo = () => {
  const [toDoData, setToDoData] = useState({
    title: "",
    description: "",
  });
  const [message, setMessage] = useState(false);

  const addToDo = async (event: any) => {
    event.preventDefault();
    console.log(toDoData);
    try {
      const response = await axios.post(
        "http://localhost:2020/todos",
        toDoData
      );
      if (response.status === 200) {
        setMessage(true);
        setToDoData({
          title: "",
          description: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1 style={{ color: "red" }}>ToDo list</h1>
      <form onSubmit={addToDo}>
        <div>
          <input
            type="text"
            placeholder="enter todo Title"
            name="title"
            onChange={(event) =>
              setToDoData({ ...toDoData, title: event.target.value })
            }
          />
          <input
            type="text"
            placeholder="enter todo Description"
            name="description"
            onChange={(event) =>
              setToDoData({ ...toDoData, description: event.target.value })
            }
          />
          <button type="submit">Add To Do</button>
        </div>
        <div>{message === true && <p>To Do item added in the list</p>}</div>
      </form>
    </>
  );
};

export default ToDo;
