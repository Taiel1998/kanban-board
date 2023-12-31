import React from 'react';
import './App.css';
import Board from './features/kanban/Board';

const App: React.FC = () => {
  return (
    <div className="App">
      <Board/>
    </div>
  );
};

export default App;