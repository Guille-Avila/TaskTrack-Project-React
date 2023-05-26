import React, { useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from "../assets/images/logo-slogan.png";
import DropList from "./DropList";
import "../assets/style/SideBar.css";
import { FaRegAddressBook, FaRegCalendarCheck, FaRegCalendarTimes, FaRegCheckCircle, FaRegUserCircle, FaSignInAlt } from 'react-icons/fa';
import { HiUserGroup } from "react-icons/hi";
import { DropListContext } from './DropListContext';
import axios from 'axios';

const navLinks = [
    { to: '/home', icon: <FaRegAddressBook />, text: 'All Tasks' },
    { to: '/today', icon: <FaRegCalendarCheck />, text: 'Today' },
    { to: '/due-tasks', icon: <FaRegCalendarTimes />, text: 'Due Tasks' },
    { to: '/done', icon: <FaRegCheckCircle />, text: 'Done' },
];

function SideBar() {

    const { groups, lists } = useContext(DropListContext);
    const navigate = useNavigate();

    const handleSignOut = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8000/api/logout/`, {}, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            // Process API response
            if (response.status === 200) {
                navigate('/');
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.error('Error Logout:', error);
        }
    };

    const dataGroups = <ul>
        {groups.map((group, index) => (
            <li key={index}>
                <NavLink
                    className='link-drop-list'
                    to={`/group/${group?.id}/`}>
                    <HiUserGroup />
                    {group.name}
                </NavLink>
            </li>))}
    </ul>;

    const dataLists = <ul>
        {lists.map((list, index) => (
            <li key={index}>
                <NavLink
                    to={`/list/${list?.id}/`}
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
                <DropList name="Groups" action="Add Group" data={dataGroups}></DropList>
                <DropList name="Lists" action="Add List" data={dataLists} ></DropList>
            </div>


            <ul className='footer-sidebar'>
                <li><NavLink className='link-nav-bar' to="/account"><FaRegUserCircle />Account</NavLink></li>
                <li><Link className='link-nav-bar' onClick={handleSignOut}><FaSignInAlt />Sign out</Link></li>

            </ul>

        </div>
    );
}

export default SideBar;