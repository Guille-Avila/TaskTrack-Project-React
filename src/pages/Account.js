import React, { useState } from 'react';
import SideBar from "../components/SideBar"
import "../assets/style/Forms.css";
import "../assets/style/FormAccount.css";

function Account() {

    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        telephone: '',
        company: '',
        college: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
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
                            <div key={element.name}>
                                <h3>{element.label}</h3>
                                <input
                                    type={element.type}
                                    name={element.name}
                                    value={formData[element.name]}
                                    placeholder={`Enter a ${element.name}`}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ))}

                        <div className='change-password'>
                            <button>Change password</button>
                        </div>
                        <div className='delete-account'>
                            <button>Delete account</button>
                        </div>

                    </div>

                    <div className='cancel-update'>
                        <button >Cancel</button>
                        <button >Update</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Account;