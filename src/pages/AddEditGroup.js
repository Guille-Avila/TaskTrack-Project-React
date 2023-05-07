import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import SideBar from "../components/SideBar"
import InterfaceTasks from '../components/InterfaceTasks';
import { HiUserGroup } from "react-icons/hi";
import { BsFillCircleFill, BsFillTrash3Fill } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowUp, IoIosAddCircleOutline } from 'react-icons/io';
import { FaRegUserCircle } from 'react-icons/fa';

import "../assets/style/Forms.css";
import "../assets/style/FormAddEditTask.css";
import "../assets/style/FormGroups.css";

const action = { groups: "Add Group", lists: "Add List" };

function AddEditGroup() {

    return (
        <div className='container-sidebar-interface'>
            <SideBar />
            <div className='container-forms'>
                <form>
                    <div className='add-edit-task-form'>

                        <div className='add-edit-task-form-header'>
                            <h1>New Group</h1>
                            <button><BsFillTrash3Fill />Delete Group</button>
                        </div>

                        <div className='title-task-form'>
                            <h3>Group name</h3>
                            <input type='text' placeholder='Enter group name' />
                        </div>

                        <div className='list-members-container'>
                            
                            <div>
                                <h3>Members</h3>
                                <Link className='dropdown-sidebar-links-link'>
                                    Add Member
                                    <IoIosAddCircleOutline />
                                </Link>
                            </div>

                            <div className='members-container'>
                                <ul>
                                    <li>
                                        <div>
                                            <FaRegUserCircle />
                                            Member No.1
                                            <span>email1@domain.com</span>
                                        </div>
                                        <div>
                                            <button>Edit</button>
                                            <button>Delete</button>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <FaRegUserCircle />
                                            Member No.1
                                            <span>email1@domain.com</span>
                                        </div>
                                        <div>
                                            <button>Edit</button>
                                            <button>Delete</button>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <FaRegUserCircle />
                                            Member No.1
                                            <span>email1@domain.com</span>
                                        </div>
                                        <div>
                                            <button>Edit</button>
                                            <button>Delete</button>
                                        </div>
                                    </li>
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

export default AddEditGroup;