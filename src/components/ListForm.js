import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../assets/style/FormList.css";
import { BsFillTrash3Fill } from 'react-icons/bs';
import axios from 'axios';
import { DropListContext } from '../components/DropListContext';
import { useParams } from 'react-router-dom';

const ListForm = ({ show, handleButtonClick, title, page}) => {

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
            const response = await axios.post(`https://tasktrack-project-django-production.up.railway.app/api/lists/`, {
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
            const response = await axios.put(`https://tasktrack-project-django-production.up.railway.app/api/lists/${listId}/`, {
                name: name,
            }, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            // Process API response
            if (response.status === 200) {
                handleButtonClick();
                setGroupsLists();
            }
        } catch (error) {
            console.error('Error Creating List:', error);
        }
    }

    const deleteList = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`https://tasktrack-project-django-production.up.railway.app/api/lists/${listId}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            // Process API response
            if (response.status === 204) {
                handleButtonClick();
                setGroupsLists();
                navigate(-1);
            }

        } catch (error) {
            console.error('Error Creating List:', error);
        }
    }

    useEffect(() => {
        title ? setName(title) : setName('');
        // eslint-disable-next-line
    }, [handleButtonClick]);

    useEffect(() => {
        show && handleButtonClick();
        // eslint-disable-next-line
    }, [listId]);



    return (
        <div className='box-form-list'
            style={show ? { visibility: 'visible' } : { visibility: 'hidden' }}>
            <h3>List Name</h3>
            <input type='text'
                placeholder='Enter a list name'
                value={name}
                onChange={handleNameChange} />
            {page === 'list' &&
                <button className='delete' type="button" onClick={deleteList}><BsFillTrash3Fill /><p>Delete</p></button>
            }
            <div>
                <button type="button" onClick={handleButtonClick}>Cancel</button>
                <button type="button" onClick={page === 'list' ? updateList : createList}>Save</button>
            </div>

        </div>

    );
};

export default ListForm;