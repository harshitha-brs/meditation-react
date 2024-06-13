// src/App.js
import React from 'react';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Main from '../src/components/Main';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};

export default App;
