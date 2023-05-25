import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/style/FormList.css";
import { BsFillTrash3Fill } from 'react-icons/bs';
import axios from 'axios';
import { DropListContext } from '../components/DropListContext';
import { useParams } from 'react-router-dom';

const ListForm = ({ show, handleButtonClick, title, page }) => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const { setGroupsLists } = useContext(DropListContext);
    const { listId } = useParams();

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const createList = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:8000/api/lists/`, {
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
                    const listId = response.data.id;
                    navigate(`/list/${listId}`);
                    handleButtonClick();
                    setGroupsLists();
                }
            }

        } catch (error) {
            console.error('Error Creating List:', error);
        }
    }

    const updateList = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:8000/api/lists/${listId}/`, {
                name: name,
            }, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            // Process API response
            if (response.status === 200) {
                // if (window.location.pathname === '/add-edit-task') {
                //     setGroupsLists();
                //     handleButtonClick();
                // } else {
                handleButtonClick();
                setGroupsLists();
                // }
            }

        } catch (error) {
            console.error('Error Creating List:', error);
        }
    }

    const deleteList = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:8000/api/lists/${listId}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            // Process API response
            if (response.status === 204) {
                // if (window.location.pathname === '/add-edit-task') {
                //     setGroupsLists();
                //     handleButtonClick();
                // } else {
                handleButtonClick();
                setGroupsLists();
                navigate(-1);
                // }
            }

        } catch (error) {
            console.error('Error Creating List:', error);
        }
    }

    useEffect(() => {
        setName(title);
        // eslint-disable-next-line
    }, []);

    return (
        <div className='box-form-list'
            // key={index}
            style={show ? { visibility: 'visible' } : { visibility: 'hidden' }}>
            <h3>List Name</h3>
            <input type='text'
                placeholder='Enter a list name'
                value={name}
                onChange={handleNameChange} />
            {/* <p>{task.name}</p> */}
            {page === 'list' &&
                <button className='delete' type="button" onClick={deleteList}><BsFillTrash3Fill /><p>Delete</p></button>
            }
            <div>
                <button type="button" onClick={handleButtonClick}>Cancel</button>
                <button type="button" onClick={listId ? updateList : createList}>Save</button>
            </div>

        </div>

    );
};

export default ListForm;