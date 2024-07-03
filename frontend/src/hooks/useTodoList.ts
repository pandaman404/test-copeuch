import { useEffect } from 'react';
import { useAppSelector } from '../state/hooks/useAppSelector';
import { RootState } from '../state/store';
import { useTaskActions } from './useTaskActions';

export function useTodoList() {
  const { tasks } = useAppSelector((state: RootState) => state.task);
  const { handleGetAllTasks } = useTaskActions();

  useEffect(() => {
    handleGetAllTasks();
  }, []);

  return {
    tasks,
  };
}
