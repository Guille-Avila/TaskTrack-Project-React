import React, { useEffect, useState, useContext } from 'react';
import SideBar from "../components/SideBar"
import InterfaceTasks from '../components/InterfaceTasks';
import "../assets/style/Home.css";
import { fetchTasks } from '../services/apiTasks';
import { useParams } from 'react-router-dom';
import { DropListContext } from '../components/DropListContext';

const buttons = ['Priority', 'Creation Date', 'Due Date'];
const taskMessage = "These are all the tasks in this group!"

function Group() {

    const { id } = useParams();
    const [tasks, setTasks] = useState([]);
    const { groups } = useContext(DropListContext);
    const [isFetching, setIsFetching] = useState(false);

    const title = groups.find((group) => group.id === parseInt(id))?.name;

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
            setIsFetching(false); // Indicar que la solicitud ha finalizado
        }
        console.log(id);
        console.log(tasks);
    };

    const fetchChanges = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line 
    }, [id]);

    // if (isFetching) {
    //     return <div>Cargando...</div>; // Mostrar un indicador de carga mientras se obtienen los datos
    // }

    return (
        <div className='container-sidebar-interface'>
            <SideBar />
            {isFetching ? (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        padding: '10px 20px',
                        color: '#fff',
                        borderRadius: '10px'
                    }}>Loading...</div>
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