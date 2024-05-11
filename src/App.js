import React from 'react';
import './App.css';

// Importing components
import HomeScreen from './components/HomeScreen';
import Header from './components/Header'; // Import Header component
import Footer from './components/Footer'; // Import Footer component
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      {/* Rendering components */}
      <Header /> {/* Render Header component */}
      <HomeScreen />

      <Footer /> {/* Render Footer component */}
    </div>
  );
}

export default App;
