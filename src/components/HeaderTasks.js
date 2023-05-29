import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaSearch, FaEdit } from 'react-icons/fa';
import ListForm from './ListForm';
import { useParams } from 'react-router-dom';

const HeaderTasks = ({ title }) => {
  const { id } = useParams();
  const [showListForm, setShowListForm] = useState(false);
  const currentUrl = window.location.pathname;
  const navigate = useNavigate();

  let buttonText = "";
  let destination = "";
  let page = '';

  if (currentUrl.startsWith('/group')) {
    buttonText = "Edit Group";
    destination = `/add-edit-group/${id}`;
  } else if (currentUrl.startsWith('/list')) {
    buttonText = "Edit List";
    page = 'list'
  }

  const handleClick = () => {
    currentUrl.startsWith('/group') ? navigate(destination) : setShowListForm(!showListForm);
  };

  const firstLetterUppercase = (text) => {
    return text.length > 20 ?
      text.charAt(0).toUpperCase() +
      text.slice(1, 15) + '...' :
      text.charAt(0).toUpperCase() +
      text.slice(1)
  }
  return (
    <div className='header-tasks'>
      <div className='header-tasks-title '>
        <h1>{title && firstLetterUppercase(title)}</h1>

        {(currentUrl.startsWith('/group') || currentUrl.startsWith('/list')) &&
          <div className='add-edit-task-form-header' >
            <button
              onClick={handleClick}
              style={{ color: 'black', backgroundColor: '#E6D435', marginRight: '20px' }}>
              <FaEdit />
              {buttonText}
            </button>

            <ListForm
              show={showListForm}
              handleButtonClick={handleClick}
              title={title}
              page={page} />

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
