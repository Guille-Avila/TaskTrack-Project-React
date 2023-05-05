import React from 'react';
import SideBar from "../components/SideBar"
import InterfaceTasks from '../components/InterfaceTasks';
import "../assets/style/Home.css";

const title = "Welcome User!";
const buttons = ['Priority', 'Creation Date', 'Due Date'];
const tasks = [
    {
        name: 'Task No. 1',
        description: 'description of the task number 1',
        dueDate: '05/05/2023'
    },
    {
        name: 'Task No. 2',
        description: 'description of the task number 2',
        dueDate: '06/05/2023'
    },
    {
        name: 'Task No. 3',
        description: 'description of the task number 3',
        dueDate: '07/05/2023'
    }
];

const taskMessage = "These are all your pending tasks!"


function Home() {

    return (
        <div className='container-sidebar-interface'>
            <SideBar />
            <InterfaceTasks title={title} buttons={buttons} tasks={tasks} taskMessage={taskMessage}/>
        </div>
    );
}

export default Home;