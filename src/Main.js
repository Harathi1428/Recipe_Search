import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Signup from './Signup.js';
import Login from './Login.js';
import App from './App.js';

function Main() {
  return (
    <Router>
      <div className="App1">
        <Routes>
          <Route path="/" element={<Signup/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/App" element={< App/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default Main;
