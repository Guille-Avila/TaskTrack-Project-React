import React from 'react';
import InitialPage from "../components/InitialPage";

const header = { message: "Have you an account?", button: "Login", headerLinkPath: "/login" };

const form = {
    greeting: 'Welcome!',
    inputs: [
        { id: 1, name: "email", placeholder: "Email" },
        { id: 2, name: "password1", placeholder: "Password" },
        { id: 3, name: "password2", placeholder: "Confirm your Password" },
    ],
    formButton: 'Register',
    link: 'Forgot your password?',
    linkFormPath: "/recover-password"

};

function SignUp() {
    return (
        <InitialPage header={header} form={form} />
    );
}

export default SignUp;