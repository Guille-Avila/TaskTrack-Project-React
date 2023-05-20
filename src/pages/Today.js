import React, { useEffect, useState } from 'react';
import SideBar from "../components/SideBar"
import InterfaceTasks from '../components/InterfaceTasks';
import "../assets/style/Home.css";
import { fetchTasks } from '../services/apiTasks';

const title = "Today!"
const buttons = ['Priority', 'Creation Date'];
const taskMessage = "These are all your pending tasks for today!"


function Today() {

    const [tasks, setTasks] = useState([]);
    const [changeTasks, setChangeTasks] = useState([])

    const filterToday = (list) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return list.filter((obj) => {
            const dueDate = new Date(obj.due_date);
            dueDate.setHours(+24, 0, 0, 0);
            return dueDate.toDateString() === today.toDateString();
        });
    };

    const fetchChanges = () => {
        const fetchData = async () => {
            try {
                const tasksData = await fetchTasks();
                const tasksToday = filterToday(tasksData);
                setTasks(tasksToday);
                if (tasks.length !== changeTasks.length) {
                    setChangeTasks(tasksToday)
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
                const tasksData = await fetchTasks();
                const tasksToday = filterToday(tasksData);
                setTasks(tasksToday);
                setChangeTasks(tasksToday)

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

export default Today;