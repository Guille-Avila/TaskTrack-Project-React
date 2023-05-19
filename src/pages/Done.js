import React, { useEffect, useState } from 'react';
import SideBar from "../components/SideBar"
import InterfaceTasks from '../components/InterfaceTasks';
import "../assets/style/Home.css";
import { fetchDoneTasks } from '../services/apiTasks';

const title = "Tasks Done!"
const buttons = ['Last Tasks', 'This Week', 'Last Week'];
const taskMessage = "These are all your tasks done!"

function Done() {

    const [tasks, setTasks] = useState([]);
    const [changeTasks, setChangeTasks] = useState([])

    const fetchChanges = () => {

        const fetchData = async () => {
            try {
                const tasksData = await fetchDoneTasks();
                setTasks(tasksData);
                if (tasks.length !== changeTasks.length) {
                    setChangeTasks(tasksData)
                }
            } catch (error) {
                console.error('Error al obtener las tareas:', error);
            }
        };
        fetchData();

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tasksData = await fetchDoneTasks();
                setTasks(tasksData);
                setChangeTasks(tasksData)
            } catch (error) {
                console.error('Error al obtener las tareas:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='container-sidebar-interface'>
            <SideBar />
            <InterfaceTasks title={title} buttons={buttons} tasks={tasks} taskMessage={taskMessage} fetchChanges={fetchChanges} />
        </div>
    );
}

export default Done;