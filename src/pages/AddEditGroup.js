import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from "../components/SideBar"
import { BsFillTrash3Fill } from 'react-icons/bs';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaRegUserCircle } from 'react-icons/fa';
import MemberForm from '../components/MemberForm';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import "../assets/style/Forms.css";
import "../assets/style/FormAddEditTask.css";
import "../assets/style/FormGroups.css";

function AddEditGroup() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [showMessage, setShowMessage] = useState(false);
    const [showMemberForm, setShowMemberForm] = useState(false);
    const [indexMember, setIndexMember] = useState(null);
    const [deleteMember, setDeleteMember] = useState(null);
    const [members, setMembers] = useState(null);
    const [group, setGroup] = useState(null);
    const [groupTitle, setGroupTitle] = useState("");
    const [temporaryMembers, setTemporaryMembers] = useState([]);
    const [temporaryMemberData, setTemporaryMemberData] = useState({ name: '', email: '' });

    useEffect(() => {
        const fetchGroup = async () => {
            if (id) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`http://localhost:8000/api/groups/${id}/`, {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    });
                    setGroup(response.data);
                } catch (error) {
                    console.error('Error al obtener las tareas:', error);
                }
            }
        };

        const fetchMembers = async () => {

            if (id) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`http://localhost:8000/api/members/${id}/`, {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    });
                    setMembers(response.data);
                } catch (error) {
                    console.error('Error al obtener las tareas:', error);
                }
            }
        };
        fetchGroup();
        fetchMembers();
    }, [id]);

    useEffect(() => {
        if (group) {
            setGroupTitle(group.name);
        }
    }, [group]);

    const handleGroupTitleChange = (event) => {
        setGroupTitle(event.target.value);
    };

    const handleDeleteGroup = () => {
        setShowMessage(!showMessage);
    };

    const deleteGroup = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:8000/api/groups/${id}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            // Process API response
            console.log(response.status)
            response.status === 204 && (window.location.href = '/home');

        } catch (error) {
            console.error('Error Delete Task:', error);
        }
    }

    const handleMemberForm = () => {
        setShowMemberForm(!showMemberForm);
    };

    const handleIndexMember = (index) => {
        setIndexMember(index);
    };

    const handleDeleteMember = (index) => {
        setDeleteMember(index);
    };

    return (
        <div className='container-sidebar-interface'>
            <SideBar />
            <div className='container-forms'>
                <form>
                    <div className='add-edit-task-form'>

                        <div className='add-edit-task-form-header'>
                            <h1>{group ? 'Edit Group' : 'New Group'}</h1>
                            {id && <button type="button" onClick={handleDeleteGroup}><BsFillTrash3Fill />Delete Group</button>}
                        </div>

                        {id && <div className='message-box-delete'
                            style={showMessage ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                            <p>Do you want to delete this Group?</p>
                            <p>{group?.name}</p>
                            <div>
                                <button type="button" onClick={handleDeleteGroup}>No</button>
                                <button type="button" onClick={deleteGroup}>Yes</button>
                            </div>
                        </div>}

                        <div className='title-task-form'>
                            <h3>Group name</h3>
                            <input type='text' value={groupTitle} placeholder='Enter group name' onChange={handleGroupTitleChange} />
                        </div>

                        <div className='list-members-container'>

                            <div>
                                <h3 className='list-members-container-title'>Members</h3>
                                <Link
                                    className='dropdown-sidebar-links-link'
                                    onClick={handleMemberForm}
                                >
                                    Add Member
                                    <IoIosAddCircleOutline />
                                </Link>
                                <MemberForm
                                    show={showMemberForm}
                                    handleButtonClick={handleMemberForm}
                                />
                            </div>

                            <div className='members-container'>
                                <ul>
                                    {members ? (members.map((member, index) => (
                                        <li key={index}>
                                            <div>
                                                <FaRegUserCircle />
                                                {member.username}
                                                <span>{member.email}</span>
                                            </div>
                                            <div>
                                                <button
                                                    className='members-container-edit-button'
                                                    type="button"
                                                    onClick={() => handleIndexMember(index)}>
                                                    Edit
                                                </button>

                                                <div className='box-form-list'
                                                    style={indexMember === index ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                                                    <h3>Member</h3>

                                                    <input type='text' name='name' placeholder='Member Name' defaultValue={member.name}></input>
                                                    <input type='text' name='email' placeholder='Member Email' defaultValue={member.email}></input>

                                                    <div>
                                                        <button type="button" onClick={handleIndexMember}>Cancel</button>
                                                        <button type="submit" onClick={handleIndexMember}>Save</button>
                                                    </div>

                                                </div>

                                                <button
                                                    type="button"
                                                    className='members-container-delete-button'
                                                    onClick={() => handleDeleteMember(index)}>
                                                    Delete
                                                </button >

                                                <div className='message-box-delete'
                                                    // key={index}
                                                    style={deleteMember === index ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                                                    <p>Do you want to delete this Member?</p>
                                                    <p>{member.username}</p>
                                                    <div>
                                                        <button type="button" onClick={handleDeleteMember}>No</button>
                                                        <button type="button" onClick={handleDeleteMember}>Yes</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>)))
                                        : <p style={{ marginLeft: '15px', opacity: "0.3" }}><i>Add members to the group!</i></p>}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='cancel-update' style={{ width: '102%' }}>
                        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="button" onClick={() => navigate(-1)}>{id ? 'Update' : 'Save'}</button>
                    </div>

                </form>
            </div >
        </div >
    );
}

export default AddEditGroup;