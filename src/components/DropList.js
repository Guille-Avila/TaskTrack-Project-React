import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp, IoIosAddCircleOutline } from 'react-icons/io';
import { DropListContext } from './DropListContext';
import ListForm from './ListForm';
import GroupForm from './GroupForm';

function DropList(props) {

    const { name, action, data, link } = props;
    const { isOpen, setIsOpen } = useContext(DropListContext);;
    const [showListForm, setShowListForm] = useState(false);
    const [showGroupForm, setShowGroupForm] = useState(false);

    const handleClick = () => {
        setIsOpen(prevState => ({ ...prevState, [name]: !prevState[name] }));

    };
    const handleListForm = () => {
        setShowListForm(!showListForm);
    };
    const handleGroupForm = () => {
        setShowGroupForm(!showGroupForm);
    };

    return (
        <div className="dropdown-sidebar">
            <div className='dropdown-sidebar-links'>
                <button onClick={handleClick}>
                    {isOpen[name] ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    {name}
                </button>
                <Link className='dropdown-sidebar-links-link' to={link} onClick={name === 'Lists' ? handleListForm : handleGroupForm}>
                    {action}&nbsp;
                    <IoIosAddCircleOutline />
                </Link>
            </div>


            <ListForm show={showListForm} handleButtonClick={handleListForm}></ListForm >
            <GroupForm show={showGroupForm} handleButtonClick={handleGroupForm}></GroupForm >

            {isOpen[name] && (
                <div className='dropdown-container-list'>
                    {data}
                </div>
            )}
        </div>
    );
}

export default DropList; 