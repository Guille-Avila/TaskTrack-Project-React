import React from 'react';
import "../assets/style/InterfaceTasks.css";
import TaskList from './TaskList';
import HeaderTasks from './HeaderTasks';
import FilterTasks from './FilterTasks';
import AddNewTaskLink from './AddNewTask';

function InterfaceTasks({ title, buttons, tasks, taskMessage }) {
    return (
        <div className="container-tasks">
            <HeaderTasks title={title}/>
            <FilterTasks buttons={buttons} />
            <TaskList tasks={tasks} taskMessage={taskMessage} />
            <AddNewTaskLink />
        </div>
    );
}

export default InterfaceTasks;