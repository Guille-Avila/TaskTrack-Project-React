import React, { useState } from 'react';
import InitialPage from "../components/InitialPage";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const header = { message: "New here?", button: "Sign up", headerLinkPath: "/sign-up" };

function RecoverPassword() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const form = {
        greeting: 'Recover your password!',
        inputs: [
            { id: 1, type: "text", value: email, placeholder: "Enter your Email", onChange: handleEmailChange },
        ],
        formButton: 'Send email',
        link: 'Login',
        linkFormPath: "/login"
    };

    const handleSendEmailRecoverPassword = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/email-password/', {
                email: email,
            });

            // Process API response
            console.log(response.status)
            response.status === 200 && navigate('/login');

        } catch (error) {
            console.error('Error Send Email recover Password:', error);
        }

    };

    return (
        <InitialPage header={header} form={{ ...form, handleSubmit: handleSendEmailRecoverPassword }} />
    );
}

export default RecoverPassword;