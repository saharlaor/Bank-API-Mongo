import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Actions from "../Actions/Actions";
import Home from "../Home/Home";
import NavBar from "../NavBar/NavBar";
import Users from "../Users/Users";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/actions" element={<Actions />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
