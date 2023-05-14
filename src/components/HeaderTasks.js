import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaSearch, FaEdit } from 'react-icons/fa';
import ListForm from './ListForm';

const HeaderTasks = ({ title }) => {

  const [showListForm, setShowListForm] = useState(false);
  const currentUrl = window.location.pathname;
  const navigate = useNavigate();

  const handleListForm = () => {
    setShowListForm(!showListForm);
  };

  let buttonText = "";
  let destination = "";
  let page = '';

  if (currentUrl.startsWith('/group')) {
    buttonText = "Edit Group";
    destination = "/add-edit-group";
  } else if (currentUrl.startsWith('/list')) {
    buttonText = "Edit List";
    // destination = "/add-edit-list";
    page = 'list'
  }

  const handleClick = () => {
    currentUrl.startsWith('/group') ? navigate(destination) : setShowListForm(!showListForm);
  };

  return (
    <div className='header-tasks'>
      <div>
        <h1>{title}</h1>

        {(currentUrl.startsWith('/group') || currentUrl.startsWith('/list')) &&
          <div className='add-edit-task-form-header' >
            <button
              onClick={handleClick}
              style={{ color: 'black', backgroundColor: '#E6D435', marginRight: '20px' }}>
              <FaEdit />
              {buttonText}
            </button>

            <ListForm show={showListForm} handleButtonClick={handleListForm} title={title} page={page}></ListForm >

          </div>
        }
      </div>

      <div className='search-bar'>
        <input type='text' placeholder='Find Your Task'></input><FaSearch />
      </div>

    </div>


  );
};

export default HeaderTasks;
