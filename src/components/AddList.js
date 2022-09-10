import React from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddList() {
  const [listName, setListName] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (listName !== "") {
      await addDoc(collection(db, "lists"), {
        listName,
        todos: [],
      });
      setListName("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="input_container">
        <input
          type="text"
          placeholder="Enter List..."
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
      </div>
      <div className="btn_container">
        <button>Add</button>
      </div>
    </form>
  );
}
