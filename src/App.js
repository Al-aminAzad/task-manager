import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/Navbar'
import Add from './components/pages/Add';
import { Edit } from './components/pages/Edit';
import Home from './components/pages/Home';

function App() {
  return (
    <div class="text-[#111827]">
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tasks' element={<Add/>} />
          <Route path='/tasks/:taskId' element={<Edit/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
