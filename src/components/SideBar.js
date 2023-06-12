import React, { useContext, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from "../assets/images/logo-slogan.png";
import DropList from "./DropList";
import "../assets/style/SideBar.css";
import { FaRegAddressBook, FaRegCalendarCheck, FaRegCalendarTimes, FaRegCheckCircle, FaRegUserCircle, FaSignInAlt, FaSearch } from 'react-icons/fa';
import { HiUserGroup, HiMenu } from "react-icons/hi";
import { BiLeftArrowAlt } from "react-icons/bi";
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
    const [showSidebar, setShowSidebar] = useState(false);

    const handleSignOut = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`https://tasktrack-project-django-production.up.railway.app/api/logout/`, {}, {
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

    const firstLetterUppercase = (text) => {
        return text.length > 18 ?
            text.charAt(0).toUpperCase() +
            text.slice(1, 15) + '...' :
            text.charAt(0).toUpperCase() +
            text.slice(1)
    }

    const dataGroups = <ul>
        {groups.map((group, index) => (
            <li key={index}>
                <NavLink
                    className='link-drop-list'
                    to={`/group/${group?.id}/`}>
                    <HiUserGroup />
                    {firstLetterUppercase(group.name)}
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
                    {firstLetterUppercase(list.name)}
                </NavLink>
            </li>))}
    </ul>;

    function hadleShowSidebar() {
        setShowSidebar(!showSidebar);
    }

    return (
        <div>
            <div className='toggle-sidebar'>
                <button
                    className="toggle-sidebar-button"
                    onClick={hadleShowSidebar}>
                    < HiMenu />
                </button>
                <h3>TaskTrack</h3>
                <FaSearch />
            </div>

            <div className="container-side-bar" style={{ display: showSidebar && 'flex' }}>
                <button
                    className="toggle-sidebar-back-button"
                    onClick={hadleShowSidebar}
                    style={{ display: !showSidebar && 'none' }}>
                    <BiLeftArrowAlt />
                </button>
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
        </div>
    );
}

export default SideBar;