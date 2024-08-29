import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import UserList from "./components/UserList/UserList";
import PostsList from "./components/PostsList/PostsList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users/:id/posts" element={<PostsList />} />
      </Routes>
    </Router>
  );
}

export default App;
