import React from 'react';
import { TasksProvider } from './context/TasksContext';
import Header from './components/Header/Header';
import Board from './components/Board/Board';
import TaskModal from './components/Modal/TaskModal';
import './App.css';

const App: React.FC = () => {
  return (
    <TasksProvider>
      <div className="app">
        <div className="app-bg-orbs" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
        <Header />
        <main className="app-main">
          <Board />
        </main>
        <TaskModal />
      </div>
    </TasksProvider>
  );
};

export default App;
