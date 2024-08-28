// App.js

import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes, Route,
  Link
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home';
import PostJob from './PostJob';

function App() {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/postjob" element={<PostJob />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
