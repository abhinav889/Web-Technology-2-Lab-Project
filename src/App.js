import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';
import AptiInstructions from './components/apti/AptiInstructions'
import Play from './components/apti/Play'

function App() {
  return (
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/play/instructions" exact component={AptiInstructions} />
        <Route path="/play/apti" exact component={Play} />
      </Router>
  );
}

export default App;
