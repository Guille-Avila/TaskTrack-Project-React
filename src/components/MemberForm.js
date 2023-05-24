import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../assets/style/FormList.css";

const MemberForm = ({ show, handleButtonClick, id }) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    useEffect(() => {
        setUsername('');
        setEmail('');
        // eslint-disable-next-line
    }, [show])

    const createMember = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8000/api/members/${id}/`, {
                username: username,
                email: email,
            }, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            // Process API response
            if (response.status === 201) {
                handleButtonClick();
            }

        } catch (error) {
            console.error('Error Create Member:', error);
        }
    }

    return (

        <div className='box-form-list'
            style={show ? { visibility: 'visible' } : { visibility: 'hidden' }}>
            <h3>Member</h3>
            <input
                type='text'
                placeholder='Username'
                value={username}
                onChange={handleUsernameChange}
            ></input>
            <input
                type='email'
                placeholder='Member Email'
                value={email}
                onChange={handleEmailChange}
            ></input>

            <div>
                <button type="button" onClick={handleButtonClick}>Cancel</button>
                <button type="button" onClick={createMember}>Save</button>
            </div>
        </div>

    );
};

export default MemberForm;