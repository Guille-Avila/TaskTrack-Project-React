import React, { useEffect, useState, useContext } from 'react';
import SideBar from "../components/SideBar"
import InterfaceTasks from '../components/InterfaceTasks';
import "../assets/style/Home.css";
import { fetchTasks } from '../services/apiTasks';
import { useParams } from 'react-router-dom';
import { DropListContext } from '../components/DropListContext';

// const title = "Name Group";
const buttons = ['Priority', 'Creation Date', 'Due Date'];
const taskMessage = "These are all the tasks in this group!"


function Group() {

    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const { groups } = useContext(DropListContext);

    const title = groups.find((group) => group.id === parseInt(id))?.name;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tasksData = await fetchTasks();
                const filterByGroup = (list) => {
                    return list.filter((obj) => obj.group === parseInt(id)
                    );
                };
                const tasksByGroup = filterByGroup(tasksData);
                setTasks(tasksByGroup);
            } catch (error) {
                console.error('Error al obtener las tareas:', error);
            }
        };

        fetchData();
    }, [id]);


    return (
        <div className='container-sidebar-interface'>
            <SideBar />
            <InterfaceTasks title={title} buttons={buttons} tasks={tasks} taskMessage={taskMessage} />
        </div>
    );
}

export default Group;