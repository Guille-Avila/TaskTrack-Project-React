import React from 'react';
import { useNavigate } from "react-router-dom";
import { FaSearch, FaEdit } from 'react-icons/fa';

const HeaderTasks = ({ title }) => {

  const currentUrl = window.location.pathname;
  const navigate = useNavigate();

  let buttonText = "";
  let destination = "";

  if (currentUrl.startsWith('/group')) {
    buttonText = "Edit Group";
    destination = "/add-edit-group";
  } else if (currentUrl.startsWith('/list')) {
    buttonText = "Edit List";
    destination = "/add-edit-list";
  }

  const handleClick = () => {
    navigate(destination);
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
