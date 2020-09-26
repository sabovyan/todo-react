import React from 'react';

import ToDoAddForm from './components/ToDoAddForm/ToDoAddForm';
import ToDoList from './components/ToDoList/ToDoList';

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <h1>Todo</h1>
      <ToDoAddForm />
      <ToDoList />
    </div>
  );
}

export default App;
