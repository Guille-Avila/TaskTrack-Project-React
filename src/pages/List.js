import React from 'react';
import SideBar from "../components/SideBar"
import InterfaceTasks from '../components/InterfaceTasks';
import "../assets/style/Home.css";

const title = "Name List";
const buttons = ['Priority', 'Creation Date', 'Due Date'];
const tasks = [
    {
        name: 'List Task No. 1',
        description: 'description of the task number 1',
        dueDate: '05/05/2023'
    },
    {
        name: 'List Task No. 2',
        description: 'description of the task number 2',
        dueDate: '06/05/2023'
    },
    {
        name: 'List Task No. 3',
        description: 'description of the task number 3',
        dueDate: '07/05/2023'
    }
];

const taskMessage = "These are all your pending tasks in this list!"


function List() {

    return (
        <div className='container-sidebar-interface'>
            <SideBar />
            <InterfaceTasks title={title} buttons={buttons} tasks={tasks} taskMessage={taskMessage}/>
        </div>
    );
}

export default List;