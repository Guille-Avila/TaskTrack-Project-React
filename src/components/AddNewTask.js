import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosAddCircleOutline } from 'react-icons/io';

const AddNewTaskLink = () => {
    return (
        <Link className='add-new-task' to='/add-edit-task'>
            <IoIosAddCircleOutline />
            Add New Task
        </Link>
    );
};

export default AddNewTaskLink;