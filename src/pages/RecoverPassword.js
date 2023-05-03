import React from 'react';
import InitialPage from "../components/InitialPage";

const header = { message: "New here?", button: "Sign up", headerLinkPath: "/sign-up" };

const form = {
    greeting: 'Recover your password!',
    inputs: [
        { id: 1, name: "email-or-username", placeholder: "Enter your email or username" }
    ],
    formButton: 'Send email',
    link: 'Login',
    linkFormPath: "/login"
};

function RecoverPassword() {
    return (
        <InitialPage header={header} form={form} />
    );
}

export default RecoverPassword;