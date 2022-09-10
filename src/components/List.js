import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { db } from "../firebase";
import EditIcon from "@mui/icons-material/Edit";
import { doc, updateDoc } from "firebase/firestore";

export default function List({ list, handleDelete }) {
  const navigate = useNavigate();
  const [newName, setNewName] = React.useState(list.listName);

  const handleEdit = async (list, title) => {
    await updateDoc(doc(db, "lists", list.id), { listName: title });
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (list.complete === false) {
      setNewName(list.listName);
    } else {
      setNewName(e.target.value);
      console.log(newName);
    }
  };

  return (
    <div className="list">
      <button
        onClick={() => {
          navigate(`/todo?listId=${list.id}`);
        }}
      >
        <MenuOpenIcon id="i" />
      </button>
      <input
        type="text"
        value={newName}
        // className="list"
        onChange={handleChange}
      />
      <div>
        <button
          className="button-edit"
          onClick={() => handleEdit(list, newName)}
        >
          <EditIcon id="i" />
        </button>
        <button className="button-delete" onClick={() => handleDelete(list.id)}>
          <DeleteIcon id="i" />
        </button>
      </div>
    </div>
  );
}
