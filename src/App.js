import React from 'react'
import Router from './routes'
import { Storage } from './context/Context'

import './App.css'

function App() {
  return (
    <Storage>
      <Router />
    </Storage>
  );
}

export default App;
