import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from "../components/SideBar"
import { HiUserGroup } from "react-icons/hi";
import { BsFillCircleFill, BsFillTrash3Fill } from 'react-icons/bs';
import { IoIosAddCircleOutline } from 'react-icons/io';
import ListForm from '../components/ListForm';

import "../assets/style/Forms.css";
import "../assets/style/FormAddEditTask.css";

const action = { groups: "Add Group", lists: "Add List" };

function AddEditTask() {

    const navigate = useNavigate();

    const [showMessage, setShowMessage] = useState(false);
    const [choosePriority, setChoosePriority] = useState("");
    const [chooseList, setChooseList] = useState(null);
    const [chooseGroup, setChooseGroup] = useState(null);
    const [showListForm, setShowListForm] = useState(false);

    const handleButtonClick = () => {
        setShowMessage(!showMessage);
    };

    const handlePriorityClick = (priority) => {
        setChoosePriority(priority);
    };

    const handleListClick = (list) => {
        setChooseList(list);
    };

    const handleGroupClick = (group) => {
        setChooseGroup(group);
    };

    const handleListForm = () => {
        setShowListForm(!showListForm);
    };


    return (
        <div className='container-sidebar-interface'>
            <SideBar />
            <div className='container-forms'>
                <form>
                    <div className='add-edit-task-form'>
                        <div className='add-edit-task-form-header'>
                            <h1>Add New Task</h1>
                            <button type="button" onClick={handleButtonClick}>
                                <BsFillTrash3Fill />Delete Task
                            </button>

                            <div className='message-box-delete'
                                // key={index}
                                style={showMessage ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                                <p>Do you want to delete this task?</p>
                                {/* <p>{task.name}</p> */}
                                <div>
                                    <button type="button" onClick={handleButtonClick}>No</button>
                                    <button type="button" onClick={handleButtonClick}>Yes</button>
                                </div>
                            </div>

                        </div>
                        <div className='title-task-form'>
                            <h3>Title</h3>
                            <input type='text' placeholder='Enter a Title' />
                        </div>

                        <textarea
                            className='textarea-task-form'
                            placeholder='Enter a description for this task...'
                        />

                        <div className='date-priority-task-form'>
                            <h3>Final date</h3>
                            <input className='input-date' type='date' placeholder='dd/mm/yyyy' />
                            <h3>Priority</h3>
                            <div>
                                <button
                                    type="button"
                                    className={choosePriority === 'Low' ? 'selected' : ''}
                                    onClick={() => handlePriorityClick('Low')}>
                                    Low <BsFillCircleFill className='circle1' /><br />
                                </button>
                                <button
                                    type="button"
                                    className={choosePriority === 'Medium' ? 'selected' : ''}
                                    onClick={() => handlePriorityClick('Medium')}>
                                    Medium <BsFillCircleFill className='circle2' /><br />
                                </button>
                                <button
                                    type="button"
                                    className={choosePriority === 'High' ? 'selected' : ''}
                                    onClick={() => handlePriorityClick('High')}>
                                    High <BsFillCircleFill className='circle3' /><br />
                                </button>
                            </div>
                        </div>

                        <div className='list-task-form'>
                            <div>
                                <h3 className='list-task-form-title'>List</h3>
                                <Link className='dropdown-sidebar-links-link'
                                    onClick={handleListForm}>
                                    {action.lists}&nbsp;
                                    <IoIosAddCircleOutline />
                                </Link>
                                <ListForm show={showListForm} handleButtonClick={handleListForm} />
                            </div>
                            <div>

                                <button type="button"
                                    className={chooseList === 1 ? 'selected' : ''}
                                    onClick={() => handleListClick(1)}>
                                    <div className='square' />List 1
                                </button>
                                <button type="button"
                                    className={chooseList === 2 ? 'selected' : ''}
                                    onClick={() => handleListClick(2)}>
                                    <div className='square' />List 2
                                </button>

                            </div>
                        </div>

                        <div className='group-task-form'>
                            <div>
                                <h3>Group</h3>
                                <Link className='dropdown-sidebar-links-link' to="/add-edit-group">
                                    {action.groups}&nbsp;
                                    <IoIosAddCircleOutline />
                                </Link>
                            </div>
                            <div>

                                <button type="button"
                                    className={chooseGroup === 1 ? 'selected' : ''}
                                    onClick={() => handleGroupClick(1)}>
                                    <HiUserGroup />Group 1
                                </button>
                                <button type="button"
                                    className={chooseGroup === 2 ? 'selected' : ''}
                                    onClick={() => handleGroupClick(2)}>
                                    <HiUserGroup />Group 2
                                </button>


                            </div>
                        </div>
                    </div>

                    <div className='cancel-update' style={{ width: '102%' }}>
                        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="button" onClick={() => navigate(-1)}>Update</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default AddEditTask;