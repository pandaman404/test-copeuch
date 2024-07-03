import type { ApiResponse } from '../@types/Api';
import type { Task, TaskId } from '../@types/Task';

const baseUrl = 'http://localhost:8080/api/v1';

export const getAllTasks = async () => {
  try {
    const response = await fetch(`${baseUrl}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: ApiResponse = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const createTask = async (newTask: Partial<Task>) => {
  try {
    const response = await fetch(`${baseUrl}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    const data: ApiResponse = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (taskId: TaskId, updatedTask: Partial<Task>) => {
  try {
    const response = await fetch(`${baseUrl}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });

    const data: ApiResponse = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTask = async (taskId: TaskId) => {
  try {
    const response = await fetch(`${baseUrl}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: ApiResponse = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
