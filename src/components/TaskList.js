import React, { useState } from 'react';
import { BsFillCircleFill, BsFillTrash3Fill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const TaskList = ({ tasks, taskMessage }) => {

    const currentUrl = window.location.pathname;

    const [indexMessage, setIndexMessage] = useState(null);

    const handleButtonClick = (index) => {
        setIndexMessage(index);
    };

    const setPriorityColor = (value) => {
        let circleColor = '';
        switch (value) {
            case 1:
                circleColor = '#38E635';
                break;
            case 2:
                circleColor = '#F6A811';
                break;
            case 3:
                circleColor = '#F52F52';
                break;
            default:
                break;
        }
        return circleColor
    }



    return (
        <div className='all-tasks'>
            {tasks.map((task, index) => (
                <div key={index} className='task'>
                    <div className='info-task'>
                        <div className='list-color'></div>
                        <div className='name-description-task'>
                            <h2>{task.title.length > 20 ?
                                task.title.charAt(0).toUpperCase() +
                                task.title.slice(1, 20) + '...' :
                                task.title.charAt(0).toUpperCase() +
                                task.title.slice(1)}</h2>
                            <p>{task.description.length > 30 ? task.description.slice(0, 30) + '...' : task.description}</p>
                        </div>
                        <div className='details-tasks'>
                            <div className='priority'>
                                <p>Priority &nbsp; </p>
                                <BsFillCircleFill className='circle' style={{ color: setPriorityColor(task.priority) }} />
                            </div>
                            <p><i>Due Date</i> &nbsp; {new Date(task.due_date).toLocaleDateString('es-ES')}</p>
                        </div>
                    </div>

                    {
                        currentUrl === '/done' ?
                            <div className='task-actions'>
                                <button className='delete-task' onClick={() => handleButtonClick(index)}>
                                    <BsFillTrash3Fill /><p>Delete</p>
                                </button>

                                <div className='message-box-done'
                                    key={index}
                                    style={indexMessage === index ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                                    <p>Do you want to delete this task?</p>
                                    <p>{task.name}</p>
                                    <div>
                                        <button onClick={handleButtonClick}>No</button>
                                        <button onClick={handleButtonClick}>Yes</button>
                                    </div>
                                </div>

                            </div>
                            : <div className='task-actions'>
                                <Link className='edit-task' to={`/add-edit-task/${task.id}`}>Edit</Link>
                                <button className='done-task' onClick={() => handleButtonClick(index)}>Done</button>

                                <div className='message-box-done'
                                    key={index}
                                    style={indexMessage === index ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                                    <p>Have you finished this task?</p>
                                    <p>{task.name}</p>
                                    <div>
                                        <button onClick={handleButtonClick}>No</button>
                                        <button onClick={handleButtonClick}>Yes</button>
                                    </div>
                                </div>

                            </div>
                    }

                </div>
            ))}
            {tasks.length === 0 ? <p>You have no tasks!</p> : <p>{taskMessage}</p>}
        </div>
    );
};

export default TaskList;
