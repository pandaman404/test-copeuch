import { type Task } from '../@types/Task';
import { useState } from 'react';
import { useTaskActions } from './useTaskActions';

export function useRowTask(id: number, initialDescription: string, initialCurrent: boolean) {
  const { handleUpdateTask, handleDeleteTask } = useTaskActions();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updatedDescription, setUpdatedDescription] = useState<string>(initialDescription);
  const [updatedCurrent, setUpdatedCurrent] = useState<boolean>(initialCurrent);

  const handleIsEditing = (): void => {
    setIsEditing((prevState) => !prevState);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUpdatedDescription(event.target.value);
  };

  const handleCurrentChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUpdatedCurrent(event.target.checked);
  };

  const handleSubmit = () => {
    if (updatedDescription.trim() && updatedDescription.trim().length > 0 && typeof updatedCurrent === 'boolean') {
      const updatedTask: Partial<Task> = { id, description: updatedDescription.trim(), current: updatedCurrent };
      handleUpdateTask(updatedTask);
      handleIsEditing();
    }
  };

  return {
    isEditing,
    handleIsEditing,
    updatedDescription,
    handleDescriptionChange,
    updatedCurrent,
    handleCurrentChange,
    handleSubmit,
    handleDeleteTask,
  };
}
