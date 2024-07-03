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

    const json = await response.json();

    return json.data;
  } catch (error) {
    console.log(error);
  }
};

export const createTask = async (description: string) => {
  try {
    const newTask = { description, current: true };

    const response = await fetch(`${baseUrl}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    });

    const json = await response.json();

    return json.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = async (updatedTask: Partial<Task>) => {
  try {
    const { id } = updatedTask;
    const response = await fetch(`${baseUrl}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    });

    const json = await response.json();
    return json.data;
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

    const json = await response.json();
    return json.message;
  } catch (error) {
    console.log(error);
  }
};
