import { type Task } from '../@types/Task';
import { useState } from 'react';
import { AppDispatch } from '../state/store';
import { useDispatch } from 'react-redux';
import { updateTaskAsync } from '../state/task/taskSlice';

export function useEditTask(id: number, initialDescription: string, initialCurrent: boolean) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updatedDescription, setUpdatedDescription] = useState<string>(initialDescription);
  const [updatedCurrent, setUpdatedCurrent] = useState<boolean>(initialCurrent);
  const dispatch = useDispatch<AppDispatch>();

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
      dispatch(updateTaskAsync(updatedTask));
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
  };
}
