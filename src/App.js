import React, { useState } from "react";

import UserTable from "./Components/UserTable/UserTable";
import { Routes, Route } from "react-router-dom";
import UserDetailsTable from "./Components/UserDetailsTable/UserDetailsTable";
import NavBar from "./Components/NavBar/NavBar";
import Manager from "./Components/Manager/Manager";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<UserTable />} />
        <Route path="/userDetails/:id" element={<UserDetailsTable />} />
        <Route path="/manager" element={<Manager />} />
      </Routes>
    </>
  );
}

export default App;
