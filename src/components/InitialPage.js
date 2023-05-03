import React from 'react';
import { Link } from 'react-router-dom';
import InputInitialPages from './InputInitialPages';
import logo from "../assets/images/logo-slogan.png";
import "../assets/style/login.css";

function InitialPage(props) {

    const { header: { message, button, headerLinkPath }, form: { greeting, inputs, formButton, link, linkFormPath, handleClick } } = props

    const inputsComponent = inputs.map((input) =>
        <InputInitialPages key={input.id} name={input.name} placeholder={input.placeholder} />);

    return (
        <div className="container">

            <header className="header">
                <div className="logo-slogan">
                    <img src={logo} alt="logo" />
                </div>
                <div className="button-header">
                    <p>{message}</p>
                    <Link className="link-header" to={headerLinkPath}>{button}</Link>
                </div>
            </header>

            <div className="center-container-form">
                <div className="container-form">
                    <form className="form">
                        <p>{greeting}</p>
                        {inputsComponent}
                        <button type="submit" onClick={handleClick}>
                            {formButton}
                        </button>
                        <Link className="link-form" to={linkFormPath}>
                            {link}
                        </Link>

                    </form>
                </div>
            </div>

        </div>
    );
}

export default InitialPage;