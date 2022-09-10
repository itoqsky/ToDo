import React from "react";
import Title from "../components/Title";
import AddList from "../components/AddList";
import List from "../components/List";
import { db } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

function ListPage() {
  const [lists, setLists] = React.useState([]);

  React.useEffect(() => {
    const q = query(collection(db, "lists"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let listArray = [];
      querySnapshot.forEach((doc) => {
        listArray.push({ ...doc.data(), id: doc.id });
      });
      setLists(listArray);
    });
    return () => unsub();
  }, []);

  // const toggleComplete = async (todo) => {
  //   await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  // };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "lists", id));
  };
  return (
    <div className="ListPage">
      <div>
        <Title />
      </div>
      <div>
        <AddList />
      </div>
      <div className="todo_container">
        {lists.map((list) => (
          <List key={list.id} list={list} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
export default ListPage;
