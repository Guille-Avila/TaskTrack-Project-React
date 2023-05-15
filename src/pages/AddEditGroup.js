import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SideBar from "../components/SideBar"
import { BsFillTrash3Fill } from 'react-icons/bs';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaRegUserCircle } from 'react-icons/fa';
import MemberForm from '../components/MemberForm';
import "../assets/style/Forms.css";
import "../assets/style/FormAddEditTask.css";
import "../assets/style/FormGroups.css";

const members = [
    {
        name: 'Member No.1',
        email: 'email1@domain.com'
    },
    {
        name: 'Member No.2',
        email: 'email2@domain.com'
    },
    {
        name: 'Member No.3',
        email: 'email3@domain.com'
    }
];

function AddEditGroup() {

    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(false);
    const [showMemberForm, setShowMemberForm] = useState(false);
    const [indexMember, setIndexMember] = useState(null);
    const [deleteMember, setDeleteMember] = useState(null);

    const handleDeleteGroup = () => {
        setShowMessage(!showMessage);
    };

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
                            <h1>New Group</h1>
                            <button type="button" onClick={handleDeleteGroup}><BsFillTrash3Fill />Delete Group</button>
                        </div>

                        <div className='message-box-delete'
                            style={showMessage ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                            <p>Do you want to delete this Group?</p>
                            {/* <p>{task.name}</p> */}
                            <div>
                                <button type="button" onClick={handleDeleteGroup}>No</button>
                                <button type="button" onClick={handleDeleteGroup}>Yes</button>
                            </div>
                        </div>

                        <div className='title-task-form'>
                            <h3>Group name</h3>
                            <input type='text' placeholder='Enter group name' />
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
                                                {member.name}
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
                                                    <input type='text' placeholder='Member Name' defaultValue={member.name}></input>
                                                    <input type='text' placeholder='Member Email' defaultValue={member.email}></input>

                                                    <div>
                                                        <button type="button" onClick={handleIndexMember}>Cancel</button>
                                                        <button type="button" onClick={handleIndexMember}>Save</button>
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
                                                    <p>{member.name}</p>
                                                    <div>
                                                        <button type="button" onClick={handleDeleteMember}>No</button>
                                                        <button type="button" onClick={handleDeleteMember}>Yes</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </li>

                                    ))) : <p>Add members to the group!</p>}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='cancel-update' style={{ width: '102%' }}>
                        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="button" onClick={() => navigate(-1)}>Update</button>
                    </div>

                </form>
            </div >
        </div >
    );
}

export default AddEditGroup;