import type { Task, TaskId } from '../@types/Task';
import { useAppDispatch } from '../state/hooks/useAppDispatch';
import { createTaskAsync, deleteTaskAsync, getTasksAsync, updateTaskAsync } from '../state/task/taskSlice';

export function useTaskActions() {
  const dispatch = useAppDispatch();

  const handleCreateTask = (description: string) => {
    dispatch(createTaskAsync(description.trim()));
  };

  const handleGetAllTasks = () => {
    dispatch(getTasksAsync());
  };

  const handleUpdateTask = (updatedTask: Partial<Task>): void => {
    dispatch(updateTaskAsync(updatedTask));
  };

  const handleDeleteTask = (id: TaskId): void => {
    dispatch(deleteTaskAsync(id));
  };

  return {
    handleCreateTask,
    handleGetAllTasks,
    handleUpdateTask,
    handleDeleteTask,
  };
}
