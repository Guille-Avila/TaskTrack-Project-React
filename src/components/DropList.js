import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp, IoIosAddCircleOutline } from 'react-icons/io';


function DropList(props) {

    const { name, action, data } = props
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className="dropdown-sidebar">

            <div className='dropdown-sidebar-links'>
                <button onClick={handleClick}>
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    {name}
                </button>

                <Link className='dropdown-sidebar-links-link'>
                    {action}&nbsp;
                    <IoIosAddCircleOutline />
                </Link>
            </div>

            {isOpen && (
                <div className='dropdown-container-list'>
                    {data}
                </div>
            )}
        </div>
    );
}

export default DropList;