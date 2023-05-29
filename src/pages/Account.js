import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from "../components/SideBar"
import "../assets/style/Forms.css";
import "../assets/style/FormAccount.css";
import axios from 'axios';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiClipboard } from 'react-icons/fi';
import { HiOutlineMail, HiOutlineOfficeBuilding } from 'react-icons/hi';
import { MdOutlineSmartphone } from 'react-icons/md';
import { AiOutlineBook } from 'react-icons/ai';


function Account() {

    const navigate = useNavigate();
    const [boxChangePassword, setBoxChangePassword] = useState(false);
    const [boxDeleteAccount, setBoxDeleteAccount] = useState(false);
    const [userData, setUserData] = useState({});
    const [currentUser, setCurrentUser] = useState(null);
    const [passwords, setPasswords] = useState({
        password: '',
        new_password: '',
        confirm_new_password: '',

    });

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/user/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            setUserData(response.data[0]);
        } catch (error) {
            console.error('Error obtain User:', error);
            throw error;
        }
    };

    const getCurrentUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/current-user/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            setCurrentUser(response.data.id)
        } catch (error) {
            console.error('Error retrieving current user:', error);
            return null;
        }
    };

    const updateUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:8000/api/user/${currentUser}/`,
                userData,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

            if (response.status === 200) {
                navigate(-1);
            }
        } catch (error) {
            console.error('Error update User:', error);
            throw error;
        }
    };

    const updateUserPassword = async () => {
        console.log(userData);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:8000/api/change-password/`,
                passwords,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });

            if (response.status === 200) {
                handleBoxChangePassword();
                fetchUser();
            }
        } catch (error) {
            console.error('Error update User:', error);
            throw error;
        }
    };

    const deleteUser = async () => {
        console.log(userData);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:8000/api/user/${currentUser}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            if (response.status === 204) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error Deleting User:', error);
            throw error;
        }
    };


    useEffect(() => {
        fetchUser();
        getCurrentUser();
        // eslint-disable-next-line
    }, []);




    const handleInputChange = (name, value) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const handleInputPasswordsChange = (event) => {
        console.log(passwords);
        const { name, value } = event.target;
        setPasswords((prevPasswords) => ({
            ...prevPasswords,
            [name]: value
        }));
    };

    const handleBoxChangePassword = () => {
        setBoxChangePassword(!boxChangePassword);
    };

    const handleBoxDeleteAccount = () => {
        setBoxDeleteAccount(!boxDeleteAccount);
    };

    const formElementsArray = [
        { icon: FaRegUserCircle, label: 'User Name', type: 'text', name: 'username' },
        { icon: FiClipboard, label: 'Full Name', type: 'text', name: 'name' },
        { icon: HiOutlineMail, label: 'Email', type: 'email', name: 'email' },
        { icon: MdOutlineSmartphone, label: 'Telephone', type: 'tel', name: 'phone' },
        { icon: HiOutlineOfficeBuilding, label: 'Company', type: 'text', name: 'company' },
        { icon: AiOutlineBook, label: 'College', type: 'text', name: 'college' },
    ];

    return (
        <div className='container-sidebar-forms'>
            <SideBar />
            <div className='container-forms'>
                <form>
                    <div className="form-account">
                        <h1>Account</h1>
                        {formElementsArray.map((element) => (
                            <div className='form-account-div' key={element.name}>
                                <div style={{ display: 'flex' }}>
                                    <element.icon />
                                    <h3 className='form-account-titles'>{element.label}</h3>

                                </div>
                                <input
                                    type={element.type}
                                    name={element.name}
                                    value={userData[element.name] || ''}
                                    placeholder={`Enter a ${element.name}`}
                                    onChange={(e) => handleInputChange(element.name, e.target.value)}
                                />
                            </div>
                        ))}


                        {/* Change Password ============================================== */}

                        <div className='change-password'>
                            <button type='button' onClick={handleBoxChangePassword}>Change password</button>
                            <div className='box-form-list'
                                style={boxChangePassword ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                                <h3>Change Password</h3>
                                <input
                                    type='text'
                                    placeholder='Password'
                                    value={passwords.password}
                                    onChange={handleInputPasswordsChange}
                                    name='password' />
                                <input
                                    type='text'
                                    placeholder='New Password'
                                    value={passwords.new_password}
                                    onChange={handleInputPasswordsChange}
                                    name='new_password' />
                                <input
                                    type='text'
                                    placeholder='Confirm new password'
                                    value={passwords.confirm_new_password}
                                    onChange={handleInputPasswordsChange}
                                    name='confirm_new_password' />
                                <div>
                                    <button type="button" onClick={handleBoxChangePassword}>Cancel</button>
                                    <button type="button" onClick={updateUserPassword}>Save</button>
                                </div>
                            </div>
                        </div>

                        <div className='delete-account'>
                            <button type="button" onClick={handleBoxDeleteAccount}>Delete account</button>
                            <div className='message-box-delete'
                                style={boxDeleteAccount ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                                <p>Do you want delete your account?</p>
                                {/* <p>{task.name}</p> */}
                                <div>
                                    <button type="button" onClick={handleBoxDeleteAccount}>No</button>
                                    <button type="button" onClick={deleteUser}>Yes</button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='cancel-update'>
                        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="button" onClick={updateUser}>Update</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Account;