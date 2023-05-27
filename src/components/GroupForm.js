import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/style/FormList.css";
import axios from 'axios';
import { DropListContext } from '../components/DropListContext';
import { useParams } from 'react-router-dom';

const GroupForm = ({ show, handleButtonClick }) => {

    const [name, setName] = useState("");
    const navigate = useNavigate();
    const { setGroupsLists } = useContext(DropListContext);
    const { id } = useParams();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const createGroup = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8000/api/groups/`, {
                name: name,
            }, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            // Process API response
            if (response.status === 201) {
                if (window.location.pathname === '/add-edit-task') {
                    setGroupsLists();
                    handleButtonClick();
                } else {
                    const groupId = response.data.id;
                    navigate(`/add-edit-group/${groupId}`);
                    handleButtonClick();
                    setGroupsLists();
                }
            }

        } catch (error) {
            console.error('Error Create Group:', error);
        }
    }

    useEffect(() => {
        show && handleButtonClick();
        // eslint-disable-next-line
    }, [id]);

    return (

        <div className='box-form-list'
            style={show ? { visibility: 'visible' } : { visibility: 'hidden' }}>
            <h3>Group Name</h3>
            <input
                type='text'
                placeholder='Enter a group name'
                value={name}
                onChange={handleNameChange}></input>
            <div>
                <button type="button" onClick={handleButtonClick}>Cancel</button>
                <button type="button" onClick={createGroup}>Save</button>
            </div>

        </div>

    );
};

export default GroupForm;