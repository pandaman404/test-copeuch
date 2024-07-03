import { ApiMessageResponse, ApiTaskListResponse, ApiTaskResponse } from '../@types/Api';
import type { Task, TaskId } from '../@types/Task';

const baseUrl = 'http://localhost:8080/api/v1';

export const getAllTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Error obteniendo lista de tareas');

    const { data }: ApiTaskListResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('ups!');
    }
  }
};

export const createTask = async (description: string): Promise<Task> => {
  try {
    const newTask = { description, current: true };

    const response = await fetch(`${baseUrl}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) throw new Error('Error creando tarea');

    const { data }: ApiTaskResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('ups!');
    }
  }
};

export const updateTask = async (updatedTask: Partial<Task>): Promise<Task> => {
  try {
    const { id } = updatedTask;
    const response = await fetch(`${baseUrl}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) throw new Error('Error actualizando tarea');

    const { data }: ApiTaskResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('ups!');
    }
  }
};

export const deleteTask = async (taskId: TaskId): Promise<string> => {
  try {
    const response = await fetch(`${baseUrl}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Error eliminando tarea');

    const { message }: ApiMessageResponse = await response.json();
    return message;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error('ups!');
    }
  }
};
