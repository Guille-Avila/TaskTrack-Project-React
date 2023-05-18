import axios from 'axios';

export const fetchTasks = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/tasks/', {
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