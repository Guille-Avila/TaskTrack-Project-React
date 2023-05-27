import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from "../components/SideBar"
import { BsFillTrash3Fill } from 'react-icons/bs';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaRegUserCircle } from 'react-icons/fa';
import MemberForm from '../components/MemberForm';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { DropListContext } from '../components/DropListContext';

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
    const [members, setMembers] = useState([]);
    const [group, setGroup] = useState(null);
    const [groupTitle, setGroupTitle] = useState("");
    const [email, setEmail] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    // const [idGroup, setIdGroup] = useState(null);
    const { setGroupsLists } = useContext(DropListContext);

    const getCurrentUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/current-user/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            setCurrentUser(response.data)
        } catch (error) {
            console.error('Error retrieving current user:', error);
            return null;
        }
    };

    const fetchMembers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/api/members/${id}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            setMembers(response.data);
            setEmail(response.data.filter((member) => member?.email).map((member) => member?.email));
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        }
    };

    useEffect(() => {
        fetchMembers();
        getCurrentUser();
        // eslint-disable-next-line
    }, [id]);

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
                    setGroupTitle(response.data.name);
                } catch (error) {
                    console.error('Error al obtener las tareas:', error);
                }
            }
        };
        fetchGroup();
        // eslint-disable-next-line
    }, [id])

    const handleEmailChange = (event, index) => {
        const updatedEmails = [...email];
        updatedEmails[index] = event.target.value;
        setEmail(updatedEmails);
    };

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
            if (response.status === 204) {
                setGroupsLists();
                navigate('/home');
            }

        } catch (error) {
            console.error('Error Delete Group:', error);
        }
    }

    const deleteMemberAPI = async (memberId) => {
        try {
            const token = localStorage.getItem('token');
            console.log(id, memberId);
            const response = await axios.delete(`http://localhost:8000/api/members/${id}/`, {
                data: { user_id: memberId },
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            // Process API response
            console.log(response.status)
            if (response.status === 204) {
                handleDeleteMember();
                fetchMembers();
            }

        } catch (error) {
            console.error('Error Delete Member:', error);
        }
    }

    const updateMemberAPI = async (event, memberId, email) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:8000/api/members/${id}/${memberId}/`, {
                email: email
            },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

            // Process API response
            console.log(response.status)
            if (response.status === 200) {
                handleIndexMember();
                fetchMembers();
            }

        } catch (error) {
            console.error('Error Delete Member:', error);
        }
    }

    const updateGroupName = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:8000/api/groups/${id}/`, {
                name: groupTitle
            },
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

            // Process API response
            if (response.status === 200) {
                setGroupsLists();
                navigate(`/group/${id}/`);
            }
        } catch (error) {
            console.error('Error update Group Name:', error);
        }
    }

    const handleMemberForm = () => {
        setShowMemberForm(!showMemberForm);
    };

    const handleIndexMember = (index) => {
        setIndexMember(index);
        !index && setEmail(members.filter((member) => member?.email).map((member) => member?.email));
    };

    const handleDeleteMember = (index) => {
        setDeleteMember(index);
    };

    const firstLetterUppercase = (text) => {
        return text.length > 20 ?
            text.charAt(0).toUpperCase() +
            text.slice(1, 20) + '...' :
            text.charAt(0).toUpperCase() +
            text.slice(1)
    }

    return (
        <div className='container-sidebar-interface'>
            <SideBar />
            <div className='container-forms'>
                <form>
                    <div className='add-edit-task-form'>

                        <div className='add-edit-task-form-header'>
                            <h1>{group ? 'Edit Group' : 'New Group'}</h1>
                            <button type="button" onClick={handleDeleteGroup}><BsFillTrash3Fill />Delete Group</button>
                        </div>

                        <div className='message-box-delete'
                            style={showMessage ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                            <p>Do you want to delete this Group?</p>
                            <p>{group?.name}</p>
                            <div>
                                <button type="button" onClick={handleDeleteGroup}>No</button>
                                <button type="button" onClick={deleteGroup}>Yes</button>
                            </div>
                        </div>

                        <div className='title-task-form'>
                            <h3>Group name</h3>
                            <input
                                type='text'
                                value={groupTitle}
                                placeholder='Enter group name'
                                onChange={handleGroupTitleChange} />
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
                                    id={id}
                                    fetchMembers={fetchMembers}
                                />
                            </div>

                            <div className='members-container'>
                                <ul>
                                    {members ? (members.map((member, index) => (
                                        <li key={index}>
                                            <div>
                                                <FaRegUserCircle />
                                                {firstLetterUppercase(member.username)}
                                                <span>{member?.email}</span>
                                            </div>
                                            <div>
                                                {member?.id !== currentUser?.id &&
                                                    <button
                                                        className='members-container-edit-button'
                                                        type="button"
                                                        onClick={() => handleIndexMember(index)}>
                                                        Edit
                                                    </button>}

                                                {member?.id !== currentUser?.id &&
                                                    <div className='box-form-list'
                                                        style={indexMember === index ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                                                        <h3>Edit Member</h3>
                                                        <input
                                                            type='email'
                                                            name='email'
                                                            placeholder='Member Email'
                                                            value={email[index] || ''}
                                                            onChange={(event) => handleEmailChange(event, index)}></input>
                                                        <div>
                                                            <button type="button" onClick={handleIndexMember}>Cancel</button>
                                                            <button type="submit" onClick={(event) => updateMemberAPI(event, member?.id, email[index])}>Save</button>
                                                        </div>
                                                    </div>}

                                                {member?.id !== currentUser?.id &&
                                                    <button
                                                        type="button"
                                                        className='members-container-delete-button'
                                                        onClick={() => handleDeleteMember(index)}>
                                                        Delete
                                                    </button >}

                                                {member?.id !== currentUser?.id &&
                                                    <div className='message-box-delete'
                                                        // key={index}
                                                        style={deleteMember === index ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                                                        <p>Do you want to delete this Member?</p>
                                                        <p>'{firstLetterUppercase(member?.username)}'</p>
                                                        <div>
                                                            <button type="button" onClick={handleDeleteMember}>No</button>
                                                            <button type="button" onClick={() => deleteMemberAPI(member?.id)}>Yes</button>
                                                        </div>
                                                    </div>}

                                            </div>
                                        </li>)))
                                        : <p style={{ marginLeft: '15px', opacity: "0.3" }}><i>Add members to the group!</i></p>}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='cancel-update' style={{ width: '102%' }}>
                        <button type="button" onClick={() => navigate(`/group/${id}/`)}>Cancel</button>
                        <button type="button" onClick={updateGroupName}>Save</button>
                    </div>

                </form>
            </div >
        </div >
    );
}

export default AddEditGroup;