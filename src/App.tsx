import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import UserList from "./components/UserList/UserList";
import PostsList from "./components/PostsList/PostsList";
import TasksTable from "./components/TasksTable/TasksTable";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/users/:id/posts" element={<PostsList />} />
          <Route path="/tasks" element={<TasksTable />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
