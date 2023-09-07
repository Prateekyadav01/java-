import "./App.css";
import {Route, Routes } from "react-router-dom";

import Getalldata from "./components/Getalldata";
import Update from "./components/Update";
import Delete from "./components/Delete";
import Login from "./components/Login";
import Create from "./components/Create";

function App() {
  return (
   <div >
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/create" element={<Create/>} />
      <Route path="/get_customer_list" element={<Getalldata/>} />
      <Route path="/update" element={<Update/>} />
      <Route path="/delete" element={<Delete/>} />
    </Routes>
   </div>
  );
}

export default App;
