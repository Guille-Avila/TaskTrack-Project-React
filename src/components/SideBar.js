import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from "../assets/images/logo-slogan.png";
import DropList from "./DropList";
import "../assets/style/SideBar.css";
import { FaRegAddressBook, FaRegCalendarCheck, FaRegCalendarTimes, FaRegCheckCircle, FaRegUserCircle, FaSignInAlt } from 'react-icons/fa';
import { HiUserGroup } from "react-icons/hi";


const navLinks = [
    { to: '/home', icon: <FaRegAddressBook />, text: 'All Tasks' },
    { to: '/today', icon: <FaRegCalendarCheck />, text: 'Today' },
    { to: '/due-tasks', icon: <FaRegCalendarTimes />, text: 'Due Tasks' },
    { to: '/done', icon: <FaRegCheckCircle />, text: 'Done' },
];

const dataGroups = <ul>
    <li><NavLink to="#" acti><HiUserGroup />Group 1</NavLink></li>
    <li><NavLink to="#" acti><HiUserGroup />Group 2</NavLink></li>
</ul>;

const dataLists = <ul>
    <li><NavLink to="#" acti><div class="square" />List 1</NavLink></li>
    <li><NavLink to="#" acti><div class="square" />List 2</NavLink></li>
</ul>;


function SideBar() {
    return (
        <div className="container-side-bar">
            <div className="logo-slogan-side-bar">
                <Link to="/home"><img src={logo} alt="logo" to="/home"/></Link>
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

            <div className='container-droplist'>
                <DropList name="Groups" action="Add Group" data={dataGroups}></DropList>
                <DropList name="Lists" action="Add List" data={dataLists}></DropList>
            </div>

            <ul className='footer-sidebar'>
                <li><NavLink className='link-nav-bar' to="/account" acti><FaRegUserCircle />Account</NavLink></li>
                <li><NavLink className='link-nav-bar' to="/login"><FaSignInAlt />Sign out</NavLink></li>

            </ul>

        </div>
    );
}

export default SideBar;