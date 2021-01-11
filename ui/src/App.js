import React from 'react';

import SignIn from '../src/containers/Auth/auth';
import Navbar from '../src/components/Navbar/navbar'

import './App.css';

function App() {
  fetch("http://localhost:9000/testapi")
  .then(response => {
    console.log(response)
  });

  return (
    <Navbar />
  );
}

export default App;
