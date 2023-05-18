import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from "../assets/images/logo-slogan.png";
import DropList from "./DropList";
import "../assets/style/SideBar.css";
import { FaRegAddressBook, FaRegCalendarCheck, FaRegCalendarTimes, FaRegCheckCircle, FaRegUserCircle, FaSignInAlt } from 'react-icons/fa';
import { HiUserGroup } from "react-icons/hi";
import { DropListContext } from './DropListContext';

const navLinks = [
    { to: '/home', icon: <FaRegAddressBook />, text: 'All Tasks' },
    { to: '/today', icon: <FaRegCalendarCheck />, text: 'Today' },
    { to: '/due-tasks', icon: <FaRegCalendarTimes />, text: 'Due Tasks' },
    { to: '/done', icon: <FaRegCheckCircle />, text: 'Done' },
];

function SideBar() {

    const { groups, lists } = useContext(DropListContext);

    const dataGroups = <ul>
        {groups.map((group, index) => (
            <li key={index}>
                <NavLink
                    className='link-drop-list'
                    to={`/group/${group.id}/`}>
                    <HiUserGroup />
                    {group.name}
                </NavLink>
            </li>))}
    </ul>;

    const dataLists = <ul>
        {lists.map((list, index) => (
            <li key={index}>
                <NavLink
                    to={`/group/${list.id}/`}
                    className='link-drop-list'>
                    <div className="square" />
                    {list.name}
                </NavLink>
            </li>))}
    </ul>;

    return (
        <div className="container-side-bar">
            <div className="logo-slogan-side-bar">
                <Link to="/home"><img src={logo} alt="logo" to="/home" /></Link>
            </div>

            <ul className='nav-bar'>
                {navLinks.map((link, index) => (
                    <li key={index}>
                        <NavLink className='link-nav-bar' to={link.to}>
                            {link.icon}
                            {link.text}
                        </NavLink>
                    </li>
                ))}
            </ul>


            <div className='container-droplist'>
                <DropList name="Groups" action="Add Group" data={dataGroups} link='/add-edit-group'></DropList>
                <DropList name="Lists" action="Add List" data={dataLists} ></DropList>
            </div>


            <ul className='footer-sidebar'>
                <li><NavLink className='link-nav-bar' to="/account"><FaRegUserCircle />Account</NavLink></li>
                <li><NavLink className='link-nav-bar' to="/login"><FaSignInAlt />Sign out</NavLink></li>

            </ul>

        </div>
    );
}

export default SideBar;