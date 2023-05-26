import React, { useEffect, useState, useContext } from 'react';
import SideBar from "../components/SideBar"
import InterfaceTasks from '../components/InterfaceTasks';
import "../assets/style/Home.css";
import { fetchTasks } from '../services/apiTasks';
import { useParams } from 'react-router-dom';
import { DropListContext } from '../components/DropListContext';

const buttons = ['Priority', 'Creation Date', 'Due Date'];
const taskMessage = "These are all your pending tasks in this list!"


function List() {
    const { listId } = useParams();
    const [tasks, setTasks] = useState([]);
    const { lists } = useContext(DropListContext);
    const [isFetching, setIsFetching] = useState(false);

    const title = lists.find((list) => list.id === parseInt(listId))?.name;

    const filterDue = (list) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return list.filter((obj) => {
            const dueDate = new Date(obj.due_date);
            dueDate.setHours(+24, 0, 0, 0);
            return dueDate >= today || !obj.due_date;
        });
    };

    const filterByList = (list) => {
        return list.filter((obj) => obj.list === parseInt(listId)
        );
    };

    const fetchData = async () => {
        setIsFetching(true);
        try {
            const tasksData = await fetchTasks();
            const tasksByGroup = filterByList(tasksData);
            const finalData = filterDue(tasksByGroup);
            setTasks([...finalData]);
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        } finally {
            setIsFetching(false);
        }
    };

    const fetchChanges = () => {
        fetchData();
    };


    useEffect(() => {
        fetchData();
        // eslint-disable-next-line 
    }, [listId]);


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

export default List;