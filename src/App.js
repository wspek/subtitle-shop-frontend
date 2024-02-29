import axios from 'axios';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

import SubtitleGenerator from './SubtitleGenerator'; // Adjust the path as necessary
import EditPage from './EditPage'; // You will need to create this component
import TranslatePage from './TranslatePage'; // You will need to create this component

// Set global Axios defaults
axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li><Link to="/">Generate</Link></li>
              <li><Link to="/edit">Edit</Link></li>
              <li><Link to="/translate">Translate</Link></li>
            </ul>
          </nav>
          <Routes> {/* Updated from Switch to Routes */}
            <Route path="/" element={<SubtitleGenerator />} />
            <Route path="/edit" element={<EditPage />} /> {/* Update for React Router v6 */}
            <Route path="/translate" element={<TranslatePage />} /> {/* Update for React Router v6 */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
