// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import HomeScreen from './components/HomeScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import JobSearch from './components/JobSearch';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/job-search" element={<JobSearch />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
