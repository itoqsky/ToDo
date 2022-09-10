import "../App.css";
import React from "react";
import Title from "../components/Title";
import AddTodo from "../components/AddTodo";
import ToDo from "../components/ToDo";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { useSearchParams } from "react-router-dom";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  where,
} from "firebase/firestore";

function TodoPage() {
  const [searchParams] = useSearchParams();
  const listId = searchParams.get("listId");

  const navigate = useNavigate();

  const [todos, setTodos] = React.useState([]);
  const handleSetTodos = async () => {
    const todosref = collection(db, "todos");
    const q = await query(todosref, where("owner", "==", listId));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return unsub;
  };

  React.useEffect(() => {
    return () => handleSetTodos();
  }, []);

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  return (
    <div className="TodoPage">
      <div>
        <Title />
      </div>
      <div>
        <AddTodo listId={listId} />
      </div>
      <div className="todo_container">
        {todos.map((todo) => (
          <ToDo
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        <CancelIcon id="i" />
      </button>
    </div>
  );
}
export default TodoPage;
