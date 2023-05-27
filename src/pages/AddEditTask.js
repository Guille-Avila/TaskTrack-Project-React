import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from "../components/SideBar"
import { HiUserGroup } from "react-icons/hi";
import { BsFillCircleFill, BsFillTrash3Fill } from 'react-icons/bs';
import { IoIosAddCircleOutline } from 'react-icons/io';
import ListForm from '../components/ListForm';
import GroupForm from '../components/GroupForm';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DropListContext } from '../components/DropListContext';

import "../assets/style/Forms.css";
import "../assets/style/FormAddEditTask.css";

const action = { groups: "Add Group", lists: "Add List" };

function AddEditTask() {

    const { id } = useParams();
    const [task, setTask] = useState(null);


    useEffect(() => {
        const fetchTask = async () => {

            if (id) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`http://localhost:8000/api/tasks/${id}/`, {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    });
                    setTask(response.data);
                } catch (error) {
                    console.error('Error al obtener las tareas:', error);
                }
            }
        };
        fetchTask();
        // eslint-disable-next-line
    }, [id]);

    const navigate = useNavigate();
    const { groups, lists } = useContext(DropListContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState(null);
    const [list, setList] = useState(null);
    const [group, setGroup] = useState(null);

    const [boxDeleteTask, setBoxDeleteTask] = useState(false);
    const [showListForm, setShowListForm] = useState(false);
    const [showGroupForm, setShowGroupForm] = useState(false);

    const BoxDelete = () => {
        setBoxDeleteTask(!boxDeleteTask);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleDueDateChange = (event) => {
        setDueDate(event.target.value);
    };

    const handlePriorityChange = (id) => {
        setPriority(id);
    };

    const handleListChange = (id) => {
        id === list ? setList(null) : setList(id);
    }

    const handleGroupChange = (id) => {
        id === group ? setGroup(null) : setGroup(id);
    }

    const handleListForm = () => {
        setShowListForm(!showListForm);
    };

    const handleGroupForm = () => {
        setShowGroupForm(!showGroupForm);
    };

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(!task.description ? '' : task.description);
            setDueDate(task.due_date);
            setPriority(task.priority);
            setGroup(task.group);
            setList(task.list);
        }
    }, [task]);

    const updateTask = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:8000/api/tasks/${id}/`, {
                title: title,
                description: description === "" ? null : description,
                due_date: dueDate === "" ? null : dueDate,
                priority: priority,
                group: group,
                list: list,
            }, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            // Process API response
            response.status === 200 && navigate(-1);

        } catch (error) {
            console.error('Error Update:', error);
        }
    }

    const createTask = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8000/api/tasks/`, {
                title: title,
                description: description === "" ? null : description,
                due_date: dueDate === "" ? null : dueDate,
                priority: priority ? priority : 1,
                group: group,
                list: list,
            }, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            // Process API response
            response.status === 201 && navigate(-1);

        } catch (error) {
            console.error('Error Create Task:', error);
        }
    }

    const deleteTask = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:8000/api/tasks/${id}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            // Process API response
            response.status === 204 && navigate(-1);

        } catch (error) {
            console.error('Error Delete Task:', error);
        }
    }

    // Render component ------------------------->

    return (
        <div className='container-sidebar-interface'>
            <SideBar />
            <div className='container-forms'>
                <form>
                    <div className='add-edit-task-form'>
                        <div className='add-edit-task-form-header'>
                            {task ? <h1>Edit Task</h1> : <h1>Add New Task</h1>}
                            {task &&
                                <button type="button" onClick={BoxDelete}>
                                    <BsFillTrash3Fill />Delete Task
                                </button>}
                            {task &&
                                <div className='message-box-delete'
                                    style={boxDeleteTask ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                                    <p>Do you want to delete this task?</p>
                                    <p>{task.title.length > 20 ?
                                        task.title.charAt(0).toUpperCase() +
                                        task.title.slice(1, 20) + '...' :
                                        task.title.charAt(0).toUpperCase() +
                                        task.title.slice(1)}</p>
                                    <div>
                                        <button type="button" onClick={BoxDelete}>No</button>
                                        <button type="button" onClick={deleteTask}>Yes</button>
                                    </div>
                                </div>}


                        </div>
                        <div className='title-task-form'>
                            <h3>Title</h3>
                            <input
                                type='text'
                                value={title ? title : ''}
                                placeholder='Enter a Title'
                                onChange={handleTitleChange} />
                        </div>

                        <textarea
                            className='textarea-task-form'
                            value={description ? description : ''}
                            onChange={handleDescriptionChange}
                            placeholder='Enter a description for this task...'
                        />

                        <div className='date-priority-task-form'>
                            <h3>Final date</h3>
                            <input
                                className='input-date'
                                type='date'
                                value={dueDate ? dueDate : ''}
                                placeholder='dd/mm/yyyy'
                                onChange={handleDueDateChange} />

                            <h3>Priority</h3>
                            <div>
                                <button
                                    type="button"
                                    className={priority === 1 ? 'selected' : ''}
                                    onClick={() => handlePriorityChange(1)}>
                                    Low <BsFillCircleFill className='circle1' /><br />
                                </button>
                                <button
                                    type="button"
                                    className={priority === 2 ? 'selected' : ''}
                                    onClick={() => handlePriorityChange(2)}>
                                    Medium <BsFillCircleFill className='circle2' /><br />
                                </button>
                                <button
                                    type="button"
                                    className={priority === 3 ? 'selected' : ''}
                                    onClick={() => handlePriorityChange(3)}>
                                    High <BsFillCircleFill className='circle3' /><br />
                                </button>
                            </div>
                        </div>

                        {/* list section =============================== */}

                        <div className='list-task-form'>
                            <div>
                                <h3 className='list-task-form-title'>List</h3>
                                <Link
                                    className='dropdown-sidebar-links-link'
                                    onClick={handleListForm}>
                                    {action.lists}&nbsp;
                                    <IoIosAddCircleOutline />
                                </Link>
                                <ListForm show={showListForm} handleButtonClick={handleListForm} />
                            </div>
                            <div>

                                {lists.map((listmap, index) => (
                                    <button
                                        key={index}
                                        type='button'
                                        className={list === listmap.id ? 'selected' : ''}
                                        onClick={() => handleListChange(listmap.id)}>
                                        <div className='square' />
                                        {listmap.name}
                                    </button>))}

                            </div>
                        </div>

                        {/* group section ==================================== */}

                        <div className='group-task-form'>
                            <div>
                                <h3>Group</h3>
                                <Link
                                    className='dropdown-sidebar-links-link'
                                    onClick={handleGroupForm}>
                                    {action.groups}&nbsp;
                                    <IoIosAddCircleOutline />
                                </Link>
                                <GroupForm show={showGroupForm} handleButtonClick={handleGroupForm} />
                            </div>
                            <div style={{ overflow: 'auto' }}>

                                {groups.map((groupmap, index) => (
                                    <button
                                        key={index}
                                        type='button'
                                        className={group === groupmap.id ? 'selected' : ''}
                                        onClick={() => handleGroupChange(groupmap.id)}>
                                        <HiUserGroup />
                                        {groupmap.name}
                                    </button>))}

                            </div>
                        </div>
                    </div>

                    {/* Cancel save buttons ========================= */}

                    <div className='cancel-update' style={{ width: '102%' }}>
                        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="button"
                            onClick={task ? updateTask : createTask}>
                            {task ? 'Update' : 'Save'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default AddEditTask;