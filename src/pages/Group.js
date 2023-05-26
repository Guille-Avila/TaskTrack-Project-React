import React, { useEffect, useState } from 'react';
import SideBar from "../components/SideBar"
import InterfaceTasks from '../components/InterfaceTasks';
import "../assets/style/Home.css";
import { fetchTasks } from '../services/apiTasks';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const buttons = ['Priority', 'Creation Date', 'Due Date'];
const taskMessage = "These are all the tasks in this group!"

function Group() {

    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [title, setTitle] = useState("");
    // 

    const filterDue = (list) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return list.filter((obj) => {
            const dueDate = new Date(obj.due_date);
            dueDate.setHours(+24, 0, 0, 0);
            return dueDate >= today || !obj.due_date;
        });
    };

    const filterByGroup = (list) => {
        return list.filter((obj) => obj.group === parseInt(id)
        );
    };

    const fetchData = async () => {
        setIsFetching(true);
        try {
            const tasksData = await fetchTasks();
            const tasksByGroup = filterByGroup(tasksData);
            const finalData = filterDue(tasksByGroup);
            setTasks([...finalData]);
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        } finally {
            setIsFetching(false);
        }
    };

    const fetchGroup = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/api/groups/${id}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            // Process API response
            if (response.status === 200) {
                setTitle(response.data.name)
            }

        } catch (error) {
            console.error('Error update Group Name:', error);
        }
    }

    const fetchChanges = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
        fetchGroup();
        // eslint-disable-next-line 
    }, [id]);



    return (
        <div className='container-sidebar-interface'>
            <SideBar />
            {isFetching ? (
                <div style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <div
                        style={{
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            padding: '10px 20px',
                            color: '#fff',
                            borderRadius: '10px'
                        }}>Loading...</div></div>

            ) : (
                <InterfaceTasks
                    title={title}
                    buttons={buttons}
                    tasks={tasks}
                    taskMessage={taskMessage}
                    fetchChanges={fetchChanges}
                />
            )}
        </div>
    );
}

export default Group;