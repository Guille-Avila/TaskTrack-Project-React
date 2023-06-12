import axios from 'axios';

export const fetchTasks = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://tasktrack-project-django-production.up.railway.app/api/tasks/?done=false', {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        throw error;
    }
};

export const fetchDoneTasks = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://tasktrack-project-django-production.up.railway.app/api/tasks/?done=true', {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener las tareas:', error);
        throw error;
    }
};