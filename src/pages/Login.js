import React from 'react';
import InitialPage from "../components/InitialPage";
import { useNavigate } from 'react-router-dom';

const header = { message: "New here?", button: "Sign up", headerLinkPath: "/sign-up" };

const form = {
    greeting: 'Welcome Back!',
    inputs: [
        { id: 1, name: "email-or-username", placeholder: "Email or Username" },
        { id: 2, name: "password", placeholder: "Password" },
    ],
    formButton: 'Login',
    link: 'Forgot your password?',
    linkFormPath: "/recover-password",
};

function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/home');
    };

    return (
        <InitialPage header={header} form={{ ...form, handleClick: handleLogin }} />
    );
}

export default Login;