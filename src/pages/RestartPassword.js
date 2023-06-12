import React, { useState } from 'react';
import InitialPage from "../components/InitialPage";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const header = { message: "New here?", button: "Sign up", headerLinkPath: "/sign-up" };

function RestartPassword() {

    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const form = {
        greeting: 'Restart Your Password!',
        inputs: [
            { id: 1, type: "password", value: password, placeholder: "New Password", onChange: handlePasswordChange },
            { id: 2, type: "password", value: confirmPassword, placeholder: "Confirm your New Password", onChange: handleConfirmPasswordChange },
        ],
        formButton: 'Reset Password',
        link: 'Login',
        linkFormPath: "/login"
    };

    const handleResetPassword = async (event) => {
        event.preventDefault();

        try {

            const urlParams = new URLSearchParams(window.location.search);
            const pk = urlParams.get('pk');
            const token = urlParams.get('token');
            console.log(pk, token);
            const response = await axios.patch(`https://tasktrack-project-django-production.up.railway.app/api/reset-password/${pk}/${token}/`, {
                password: password,
                password_confirm: confirmPassword
            });

            // Process API response
            console.log(response.data);
            response.status === 200 && navigate('/login');
        } catch (error) {
            console.error('Error reset Password:', error);
        }

    };

    return (
        <InitialPage header={header} form={{ ...form, handleSubmit: handleResetPassword }} />
    );
}

export default RestartPassword;