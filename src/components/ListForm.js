import React from 'react';
import "../assets/style/FormList.css";
import { BsFillTrash3Fill } from 'react-icons/bs';

const ListForm = ({ show, handleButtonClick, title, page }) => {

    return (

        <div className='box-form-list'
            // key={index}
            style={show ? { visibility: 'visible' } : { visibility: 'hidden' }}>
            <h3>List Name</h3>
            <input type='text' placeholder='Enter a list name' defaultValue={title}></input>
            {/* <p>{task.name}</p> */}
            {page === 'list' &&
                <button className='delete' type="button" onClick={handleButtonClick}><BsFillTrash3Fill /><p>Delete</p></button>
            }
            <div>
                <button type="button" onClick={handleButtonClick}>Cancel</button>
                <button type="button" onClick={handleButtonClick}>Save</button>
            </div>

        </div>

    );
};

export default ListForm;