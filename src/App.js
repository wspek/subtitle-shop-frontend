import axios from 'axios';
import React from 'react';
import './App.css';
import SubtitleGenerator from './SubtitleGenerator'; // Adjust the path as necessary

// Set global Axios defaults
axios.defaults.headers.post['Content-Type'] = 'application/json';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SubtitleGenerator />
      </header>
    </div>
  );
}

export default App;
