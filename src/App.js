import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import ListPage from "./pages/ListPage";
import TodoPage from "./pages/TodoPage";
function App() {
  // const todos[];
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ListPage />} />
        <Route exact path="/todo" element={<TodoPage />} />
      </Routes>
    </Router>
  );
}
export default App;
