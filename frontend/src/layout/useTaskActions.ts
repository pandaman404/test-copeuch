import { type TaskId } from '../@types/Task';
import { useAppDispatch } from '../hooks/store';
import { deleteTaskById } from '../store/tasks/slice';

export const useTaskActions = () => {
  const dispatch = useAppDispatch();

  const deleteTask = (id: TaskId) => {
    dispatch(deleteTaskById(id));
  };

  return {
    deleteTask,
  };
};
