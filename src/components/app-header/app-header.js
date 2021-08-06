import React from 'react';
import './app-header.css';

const AppHeader = ({ toDo, done }) => {
  return (
    <div className='app-header d-flex'>
      <h1>Tasks List</h1>
      <h2>
        <span className='undone-count'> {toDo} undone </span>
        <span style={{color: '#F0EDB2'}}>|</span>
        <span className='done-count'> {done} done </span>
      </h2>

    </div>
  );
};

export default AppHeader;
