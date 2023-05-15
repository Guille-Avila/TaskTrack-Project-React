import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from "../components/SideBar"
import "../assets/style/Forms.css";
import "../assets/style/FormAccount.css";

function Account() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        telephone: '',
        company: '',
        college: '',
    });

    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleChangePassword = () => {
        setShowChangePassword(!showChangePassword);
    };

    const handleDeleteAccount = () => {
        setShowDeleteAccount(!showDeleteAccount);
    };

    const formElementsArray = [
        { label: 'User Name', type: 'text', name: 'username' },
        { label: 'Full Name', type: 'text', name: 'fullName' },
        { label: 'Email', type: 'email', name: 'email' },
        { label: 'Telephone', type: 'tel', name: 'telephone' },
        { label: 'Company', type: 'text', name: 'company' },
        { label: 'College', type: 'text', name: 'college' },
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
                                <h3 className='form-account-titles'>{element.label}</h3>
                                <input
                                    type={element.type}
                                    name={element.name}
                                    defaultValue={formData[element.name]}
                                    placeholder={`Enter a ${element.name}`}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ))}

                        <div className='change-password'>
                            <button type='button' onClick={handleChangePassword}>Change password</button>
                            <div className='box-form-list'
                                style={showChangePassword ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                                <h3>Change Password</h3>
                                <input type='text' placeholder='Password' ></input>
                                <input type='text' placeholder='New Password'></input>
                                <input type='text' placeholder='Confirm new password'></input>
                                <div>
                                    <button type="button" onClick={handleChangePassword}>Cancel</button>
                                    <button type="button" onClick={handleChangePassword}>Save</button>
                                </div>
                            </div>
                        </div>

                        <div className='delete-account'>
                            <button type="button" onClick={handleDeleteAccount}>Delete account</button>
                            <div className='message-box-delete'
                                style={showDeleteAccount ? { visibility: 'visible' } : { visibility: 'hidden' }}>
                                <p>Do you want delete your account?</p>
                                {/* <p>{task.name}</p> */}
                                <div>
                                    <button type="button" onClick={handleDeleteAccount}>No</button>
                                    <button type="button" onClick={handleDeleteAccount}>Yes</button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='cancel-update'>
                        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="button" onClick={() => navigate(-1)}>Update</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Account;