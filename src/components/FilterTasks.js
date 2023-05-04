import React from 'react';

const FilterTasks = ({ buttons }) => {
    return (
        <div className='filter-tasks'>
            {buttons.map((buttonText, index) => (
                <button key={index}>{buttonText}</button>
            ))}
        </div>
    );
};

export default FilterTasks;