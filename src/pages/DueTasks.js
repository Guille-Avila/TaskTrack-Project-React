import React from 'react';
import SideBar from "../components/SideBar"
import InterfaceTasks from '../components/InterfaceTasks';
import "../assets/style/Home.css";

const title = "Due Tasks!"

const buttons = ['Priority', 'Creation Date'];

const tasks = [
    {
        name: 'Due Task No. 1',
        description: 'description of the task number 1',
        dueDate: '05/05/2023'
    },
    {
        name: 'Due Task No. 2',
        description: 'description of the task number 2',
        dueDate: '06/05/2023'
    },
    {
        name: 'Due Task No. 3',
        description: 'description of the task number 3',
        dueDate: '07/05/2023'
    }
];

const taskMessage = "These are all your due tasks!"


function DueTasks() {

    return (
        <div className='container-sidebar-interface'>
            <SideBar />
            <InterfaceTasks title={title} buttons={buttons} tasks={tasks} taskMessage={taskMessage} />
        </div>
    );
}

export default DueTasks;