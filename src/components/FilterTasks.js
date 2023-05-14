import React, { useState } from 'react';

const FilterTasks = ({ buttons }) => {

    const [activeButton, setActiveButton] = useState(0);

    const handleButtonClick = (index) => {
        setActiveButton(index);
    };
    return (
        <div className='filter-tasks'>
            {buttons.map((buttonText, index) => (
                <button className={`${activeButton === index ? 'active' : ''}`}
                    key={index}
                    onClick={() => handleButtonClick(index)}>
                    {buttonText}
                </button>
            ))}
        </div>

    );
};

export default FilterTasks;