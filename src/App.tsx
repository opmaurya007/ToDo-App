import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import ToDo from "./ToDo";
function App() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const fetchToDo = async () => {
      try {
        const response = await axios.get("http://localhost:2020/todos");
        if (response.status === 200) {
          setTodo(response.data);
        }
      } catch (error) {
        console.log(error, { message: "Error in Fetching ToDos" });
      }
    };

    fetchToDo();
  });

  const deleteToDo = async (id: any) => {
    console.log("Deleting ToDo with ID:", id);
    try {
      const response = await axios.delete(`http://localhost:2020/todos/${id}`);
      if (response.status === 200) {
        window.alert("Task Deleted");
      }
    } catch (error) {
      window.alert("There is something error");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <ToDo />
      <div>
        {todo.map((item: any, id: number) => (
          <div key={id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button onClick={() => deleteToDo(item._id)}>Completed Task</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
