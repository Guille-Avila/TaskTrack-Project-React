import React from 'react';
import { FaSearch } from 'react-icons/fa';

const HeaderTasks = ({ title }) => {
  return (
    <div className='header-tasks'>
      <h1>{title}</h1>
      <div className='search-bar'>
        <input type='text' placeholder='Find Your Task'></input><FaSearch />
      </div>
    </div>
  );
};

export default HeaderTasks;
