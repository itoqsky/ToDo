import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

export default function List({
  list,
  //   toggleComplete,
  handleDelete,
}) {
  const navigate = useNavigate();
  const [newName, setNewName] = React.useState(list.listName);

  const handleChange = (e) => {
    e.preventDefault();
    if (list.complete === false) {
      setNewName(list.listName);
    } else {
      list.listName = "";
      setNewName(e.target.value);
    }
  };

  return (
    <button
      onClick={() => {
        navigate("/todo");
      }}
    >
      <div className="list">
        <input
          type="text"
          value={list.listName === "" ? newName : list.listName}
          // className="list"
          onChange={handleChange}
        />
        <div>
          <button
            className="button-delete"
            onClick={() => handleDelete(list.id)}
          >
            <DeleteIcon id="i" />
          </button>
        </div>
      </div>
    </button>
  );
}
