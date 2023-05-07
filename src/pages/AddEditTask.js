import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import SideBar from "../components/SideBar"
import InterfaceTasks from '../components/InterfaceTasks';
import { HiUserGroup } from "react-icons/hi";
import { BsFillCircleFill, BsFillTrash3Fill } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowUp, IoIosAddCircleOutline } from 'react-icons/io';

import "../assets/style/Forms.css";
import "../assets/style/FormAddEditTask.css";

const action = { groups: "Add Group", lists: "Add List" };

function AddEditTask() {

    return (
        <div className='container-sidebar-interface'>
            <SideBar />
            <div className='container-forms'>
                <form>
                    <div className='add-edit-task-form'>
                        <div className='add-edit-task-form-header'>
                            <h1>Add New Task</h1>
                            <button><BsFillTrash3Fill />Delete Task</button>
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
                            <input className='input-date' type='text' placeholder='dd/mm/yyyy' />
                            <h3>Priority</h3>
                            <div>
                                <label><input type='radio' />Low <BsFillCircleFill className='circle1' /><br /></label>
                                <label><input type='radio' />Medium <BsFillCircleFill className='circle2' /><br /></label>
                                <label><input type='radio' />High <BsFillCircleFill className='circle3' /><br /></label>
                            </div>
                        </div>

                        <div className='list-task-form'>
                            <div>
                                <h3>List</h3>
                                <Link className='dropdown-sidebar-links-link'>
                                    {action.lists}&nbsp;
                                    <IoIosAddCircleOutline />
                                </Link>
                            </div>
                            <div>
                                <ul>
                                    <li><NavLink to="#" acti><div className='square' />List 1</NavLink></li>
                                    <li><NavLink to="#" acti><div className='square' />List 2</NavLink></li>
                                </ul>
                            </div>
                        </div>

                        <div className='group-task-form'>
                            <div>
                                <h3>Group</h3>
                                <Link className='dropdown-sidebar-links-link'>
                                    {action.groups}&nbsp;
                                    <IoIosAddCircleOutline />
                                </Link>
                            </div>
                            <div>
                                <ul>
                                    <li><NavLink to="#" acti><HiUserGroup />Group 1</NavLink></li>
                                    <li><NavLink to="#" acti><HiUserGroup />Group 2</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='cancel-update' style={{ width: '102%' }}>
                        <button >Cancel</button>
                        <button >Update</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default AddEditTask;