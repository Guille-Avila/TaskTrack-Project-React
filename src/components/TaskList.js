import React, { useState } from 'react';
import { BsFillCircleFill, BsFillTrash3Fill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaRegCheckCircle } from 'react-icons/fa';

const TaskList = ({ tasks, taskMessage, fetchChanges }) => {

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

    const doneTask = async (task) => {
        // event.preventDefault();
        try {
            const date = new Date();
            const token = localStorage.getItem('token');
            const response = await axios.put(`https://tasktrack-project-django-production.up.railway.app/api/tasks/${task.id}/`, {
                title: task.title,
                done: true,
                done_date: date.toISOString()
            }, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            // Process API response
            fetchChanges();
            response.status === 200 && handleButtonClick();
        } catch (error) {
            console.error('Error Done Task:', error);
        }
    }

    const deleteTask = async (task) => {
        // event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`https://tasktrack-project-django-production.up.railway.app/api/tasks/${task.id}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            // Process API response
            fetchChanges();
            response.status === 204 && handleButtonClick();
        } catch (error) {
            console.error('Error Done Task:', error);
        }
    }

    const firstLetterUppercase = (text) => {
        return text.length > 20 ?
            text.charAt(0).toUpperCase() +
            text.slice(1, 20) + '...' :
            text.charAt(0).toUpperCase() +
            text.slice(1)
    }

    function setDate(date) {
        const dueDate = new Date(date.due_date);
        const dueDay = dueDate.getUTCDate();
        const dueMonth = dueDate.getUTCMonth() + 1;
        const dueYear = dueDate.getUTCFullYear();

        return `${dueDay}/${dueMonth}/${dueYear}`;
    }

    return (
        <div className='all-tasks'>
            {tasks.map((task, index) => (
                <div key={index} className='task'>
                    <div className='info-task'>
                        <div className='list-color'></div>
                        <div className='name-description-task'>
                            <h2>{firstLetterUppercase(task.title)}</h2>
                            {!task.description ?
                                <p>No description</p> :
                                <p>{task.description.length > 30 ?
                                    task.description.slice(0, 30) + '...' :
                                    task.description}</p>}
                        </div>
                        <div className='details-tasks'>
                            <div className='priority'>
                                <p>Priority &nbsp; </p>
                                <BsFillCircleFill className='circle' style={{ color: setPriorityColor(task.priority) }} />
                            </div>
                            <p><i>Due Date</i> &nbsp; {task.due_date ? setDate(task) : 'No date'}</p>
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
                                        <button onClick={() => deleteTask(task)}>Yes</button>
                                    </div>
                                </div>

                            </div>
                            : <div className='task-actions'>
                                <Link className='edit-task' to={`/add-edit-task/${task.id}`}><FaEdit />Edit</Link>
                                <button className='done-task' onClick={() => handleButtonClick(index)}><FaRegCheckCircle />Done</button>

                                <div className='message-box-done'
                                    key={index}
                                    style={indexMessage === index ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                                    <p>Have you finished this task?</p>
                                    <p>"{firstLetterUppercase(task.title)}"</p>
                                    <div>
                                        <button onClick={handleButtonClick}>No</button>
                                        <button onClick={() => doneTask(task)}>Yes</button>

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
