import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp, IoIosAddCircleOutline } from 'react-icons/io';
import { DropListContext } from './DropListContext';

function DropList(props) {

    const { name, action, data } = props;
    const {isOpen, setIsOpen} = useContext(DropListContext);;
    
    const handleClick = () => {
        setIsOpen(prevState => ({ ...prevState, [name]: !prevState[name] }));
    };

    return (
        <div className="dropdown-sidebar">
            <div className='dropdown-sidebar-links'>
                <button onClick={handleClick}>
                    {isOpen[name] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    {name}
                </button>
                <Link className='dropdown-sidebar-links-link' to='/add-edit-group'>
                    {action}&nbsp;
                    <IoIosAddCircleOutline />
                </Link>
            </div>
            {isOpen[name] && (
                <div className='dropdown-container-list'>
                    {data}
                </div>
            )}
        </div>
    );
}

export default DropList; 