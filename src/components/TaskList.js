import React from 'react';
import { BsFillCircleFill, BsFillTrash3Fill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, taskMessage }) => {

    const currentUrl = window.location.pathname; 

    return (
        <div className='all-tasks'>
            {tasks.map((task, index) => (
                <div key={index} className='task'>
                    <div className='info-task'>
                        <div className='list-color'></div>
                        <div className='name-description-task'>
                            <h2>{task.name}</h2>
                            <p>{task.description}</p>
                        </div>
                        <div className='details-tasks'>
                            <div className='priority'>
                                <p>Priority &nbsp; </p>
                                <BsFillCircleFill className='circle' /> 
                            </div>
                            <p><i>Due Date</i> &nbsp; {task.dueDate}</p>
                        </div>
                    </div>


                    {currentUrl === '/done' ?
                        <div className='task-actions'>
                            <button className='delete-task'>
                                <BsFillTrash3Fill /><p>Delete</p>
                            </button>
                        </div>
                        : <div className='task-actions'>
                            <Link className='edit-task' to='/add-edit-task'>Edit</Link>
                            <button className='done-task'>Done</button>
                        </div>}

                </div>
            ))}
            {tasks.length === 0 ? <p>You have no tasks!</p> : <p>{taskMessage}</p>}
        </div>
    );
};

export default TaskList;
