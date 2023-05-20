import React, { useEffect, useState } from 'react';
import SideBar from "../components/SideBar"
import InterfaceTasks from '../components/InterfaceTasks';
import "../assets/style/Home.css";
import { fetchTasks } from '../services/apiTasks';


const title = "Due Tasks!"
const buttons = ['Priority', 'Creation Date'];
const taskMessage = "These are all your due tasks!"

function DueTasks() {

    const [tasks, setTasks] = useState([]);
    const [changeTasks, setChangeTasks] = useState([])

    const filterDue = (list) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return list.filter((obj) => {
            const dueDate = new Date(obj.due_date);
            dueDate.setHours(+24, 0, 0, 0);
            return dueDate < today && obj.due_date;
        });
    };

    const fetchChanges = () => {
        const fetchData = async () => {
            try {
                const tasksData = await fetchTasks();
                const tasksDue = filterDue(tasksData);
                setTasks(tasksDue);
                if (tasks.length !== changeTasks.length) {
                    setChangeTasks(tasksDue)
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
                const tasksDue = filterDue(tasksData);
                setTasks(tasksDue);
                setChangeTasks(tasksDue)
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

export default DueTasks;