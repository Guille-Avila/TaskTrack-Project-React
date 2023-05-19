import React, { useState, useEffect } from 'react';
import "../assets/style/InterfaceTasks.css";
import TaskList from './TaskList';
import HeaderTasks from './HeaderTasks';
import AddNewTaskLink from './AddNewTask';

function InterfaceTasks({ title, buttons, tasks, taskMessage, fetchChanges }) {
    const [activeButton, setActiveButton] = useState(0);
    const [filterTasks, setFilterTasks] = useState([]);

    const handleButtonClick = (index) => {
        setActiveButton(index);
        buttons[index] === 'Priority' && setFilterTasks(sortByPriority(filterTasks));
        buttons[index] === 'Creation Date' && setFilterTasks(sortByCreationDate(filterTasks));
        buttons[index] === 'Due Date' && setFilterTasks(sortByDueDate(filterTasks));
        buttons[index] === 'Last Tasks' && setFilterTasks(sortByDoneDate(filterTasks));
        buttons[index] === 'This Week' && setFilterTasks(filterByThisWeek(filterTasks));
        buttons[index] === 'Last Week' && setFilterTasks(filterByLastWeek(filterTasks));
    };

    const sortByPriority = (list) => {
        return [...list].sort((a, b) => b.priority - a.priority);
    };

    const sortByCreationDate = (list) => {
        return [...list].sort((a, b) => new Date(a.creation_date) - new Date(b.creation_date));
    };

    const sortByDueDate = (list) => {
        return [...list].sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    };

    const sortByDoneDate = (list) => {
        return [...list].sort((a, b) => new Date(b.done_date) - new Date(a.done_date));
    };

    const filterByThisWeek = (list) => {
        const today = new Date();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        return list.filter((obj) => {
            const objDate = new Date(obj.done_date); // Asume que la propiedad que contiene la fecha se llama 'date'
            return objDate >= oneWeekAgo && objDate <= today;
        });

    };

    const filterByLastWeek = (list) => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        return list.filter((obj) => {
            const objDate = new Date(obj.done_date); // Asume que la propiedad que contiene la fecha se llama 'date'
            return objDate <= oneWeekAgo;
        });

    };

    useEffect(() => {
        if (tasks.length !== filterTasks.length) {
            buttons[activeButton] === 'Priority' && setFilterTasks(sortByPriority(tasks));
            buttons[activeButton] === 'Creation Date' && setFilterTasks(sortByCreationDate(tasks));
            buttons[activeButton] === 'Due Date' && setFilterTasks(sortByDueDate(tasks));
            buttons[activeButton] === 'Last Tasks' && setFilterTasks(sortByDoneDate(tasks));
            buttons[activeButton] === 'This Week' && setFilterTasks(filterByThisWeek(tasks));
            buttons[activeButton] === 'Last Week' && setFilterTasks(filterByLastWeek(tasks));
        }
    }, [tasks, filterTasks.length, buttons, activeButton]);

    return (
        <div className="container-tasks">
            <HeaderTasks title={title} />
            <div className='filter-tasks'>
                {buttons.map((buttonText, index) => (
                    <button className={`${activeButton === index ? 'active' : ''}`}
                        key={index}
                        onClick={() => handleButtonClick(index)}>
                        {buttonText}
                    </button>
                ))}
            </div>
            <TaskList tasks={filterTasks} taskMessage={taskMessage} fetchChanges={fetchChanges}/>
            <AddNewTaskLink />
        </div>
    );
}
export default InterfaceTasks;