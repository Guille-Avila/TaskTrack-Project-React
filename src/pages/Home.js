import React, { useEffect, useState } from 'react';
import SideBar from "../components/SideBar"
import InterfaceTasks from '../components/InterfaceTasks';
import "../assets/style/Home.css";
import { fetchTasks } from '../services/apiTasks';

const title = "Welcome User!";
const buttons = ['Priority', 'Creation Date', 'Due Date'];
const taskMessage = "These are all your pending tasks!"

function Home() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tasksData = await fetchTasks();
                setTasks(tasksData);
            } catch (error) {
                console.error('Error al obtener las tareas:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='container-sidebar-interface'>
            <SideBar />
            <InterfaceTasks title={title} buttons={buttons} tasks={tasks} taskMessage={taskMessage} />
        </div>
    );
}

export default Home;