import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../assets/images/logo-slogan.png";
import DropList from "./DropList";
import "../assets/style/SideBar.css";
import { FaRegAddressBook, FaRegCalendarCheck, FaRegCalendarTimes, FaRegCheckCircle } from 'react-icons/fa';
import { HiUserGroup } from "react-icons/hi";


const navLinks = [
    { to: '/home', icon: <FaRegAddressBook />, text: 'All Tasks' },
    { to: '/today', icon: <FaRegCalendarCheck />, text: 'Today' },
    { to: '/due-tasks', icon: <FaRegCalendarTimes />, text: 'Due Tasks' },
    { to: '/done', icon: <FaRegCheckCircle />, text: 'Done' },
];

const dataGroups = <ul className="dropdown-list">
    <li><HiUserGroup /><NavLink to="#" acti>Group 1</NavLink></li>
    <li><HiUserGroup /><NavLink to="#" acti>Group 2</NavLink></li>
</ul>;

const dataLists = <ul className="dropdown-list">
    <li><NavLink to="#" acti>List 1</NavLink></li>
    <li><NavLink to="#" acti>List 2</NavLink></li>
</ul>;

function SideBar() {
    return (
        <div className="container-side-bar">
            <div className="logo-slogan-side-bar">
                <img src={logo} alt="logo" />
            </div>

            <ul className='nav-bar'>
                {navLinks.map(link => (
                    <li key={link.to}>
                        <NavLink className='link-nav-bar' to={link.to}>
                            {link.icon}
                            {link.text}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <DropList name="Groups" action="Add Group" data={dataGroups}></DropList>
            <DropList name="Lists" action="Add List" data={dataLists}></DropList>
            <ul>
                <li><NavLink to="/account" acti>Account</NavLink></li>
                <li><NavLink to="/login">Sign out</NavLink></li>

            </ul>

        </div>
    );
}

export default SideBar;