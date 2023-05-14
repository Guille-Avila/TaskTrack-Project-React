import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp, IoIosAddCircleOutline } from 'react-icons/io';
import { DropListContext } from './DropListContext';
import ListForm from './ListForm';

function DropList(props) {

    const { name, action, data, link } = props;
    const { isOpen, setIsOpen } = useContext(DropListContext);;
    const [showListForm, setShowListForm] = useState(false);

    const handleClick = () => {
        setIsOpen(prevState => ({ ...prevState, [name]: !prevState[name] }));

    };
    const handleListForm = () => {
        setShowListForm(!showListForm);
    };

    return (
        <div className="dropdown-sidebar">
            <div className='dropdown-sidebar-links'>
                <button onClick={handleClick}>
                    {isOpen[name] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    {name}
                </button>
                <Link className='dropdown-sidebar-links-link' to={link} onClick={name === 'Lists' && handleListForm}>
                    {action}&nbsp;
                    <IoIosAddCircleOutline />
                </Link>
            </div>

            <ListForm show={showListForm} handleButtonClick={handleListForm}></ListForm >

            {isOpen[name] && (
                <div className='dropdown-container-list'>
                    {data}
                </div>
            )}
        </div>
    );
}

export default DropList; 