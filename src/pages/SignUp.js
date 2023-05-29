import React, { useState } from 'react';
import InitialPage from "../components/InitialPage";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const header = { message: "Have you an account?", button: "Login", headerLinkPath: "/login" };

function SignUp() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const form = {
        greeting: 'Welcome!',
        inputs: [
            { id: 1, type: "text", value: email, placeholder: "Enter your Email", onChange: handleEmailChange },
            { id: 2, type: "password", value: password, placeholder: "Password", onChange: handlePasswordChange },
            { id: 3, type: "password", value: confirmPassword, placeholder: "Confirm your Password", onChange: handleConfirmPasswordChange },
        ],
        formButton: 'Register',
        link: 'Forgot your password?',
        linkFormPath: "/recover-password"
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', {
                email: email,
                password: password,
                password_confirm: confirmPassword
            });

            // Process API response
            const token = response.data.token;
            localStorage.setItem('token', token);
            response.status === 201 && navigate('/home');

        } catch (error) {
            console.error('Error login:', error);
        }

    };


    return (
        <InitialPage header={header} form={{ ...form, handleSubmit: handleRegister }} />
    );
}

export default SignUp;