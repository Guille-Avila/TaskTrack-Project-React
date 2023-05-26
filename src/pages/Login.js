import React, { useState } from 'react';
import InitialPage from "../components/InitialPage";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const header = { message: "New here?", button: "Sign up", headerLinkPath: "/sign-up" };

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const form = {
        greeting: 'Welcome Back!',
        inputs: [
            { id: 1, type: "text", value: email, placeholder: "Enter your Email", onChange: handleEmailChange },
            { id: 2, type: "password", value: password, placeholder: "Password", onChange: handlePasswordChange },
        ],
        formButton: 'Login',
        link: 'Forgot your password?',
        linkFormPath: "/recover-password",
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                email,
                password,
            });

            // Process API response
            const token = response.data.token;
            localStorage.setItem('token', token);
            response.status === 200 && navigate('/home');

        } catch (error) {
            console.error('Error login:', error);
        }

    };

    return (
        <InitialPage header={header} form={{ ...form, handleSubmit: handleLogin }} />
    );
}

export default Login;