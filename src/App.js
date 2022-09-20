import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from "./pages/POST"
import Preview from "./pages/Preview"


function App() {
  const [selectedId, setSelectedId] = useState(null)
  return (
    <div >
      <Router>
        <Routes>
          <Route path="/" element={<Post setSelectedId={setSelectedId} />} />
          <Route path="preview" element={<Preview selectedId={selectedId} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
