import type { Task } from '../../@types/Task';
import { TableCell, TableRow } from '@tremor/react';
import { PencilSquareIcon } from '../icons/PencilSquareIcon';
import { TrashIcon } from '../icons/TrashIcon';
import { ConfirmIcon } from '../icons/ConfirmIcon';
import { CancelIcon } from '../icons/CancelIcon';
import { useRowTask } from '../../hooks/useRowTask';

interface TodoRowProps {
  task: Task;
}

export const TodoRow = ({ task }: TodoRowProps) => {
  const { id, description, current } = task;
  const {
    isEditing,
    handleIsEditing,
    updatedDescription,
    updatedCurrent,
    handleCurrentChange,
    handleDescriptionChange,
    handleSubmit,
    handleDeleteTask,
  } = useRowTask(id, description, current);

  return (
    <TableRow>
      <TableCell className='font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong text-center'>
        {id}
      </TableCell>
      <TableCell className='font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong w-11/12'>
        {isEditing ? (
          <input
            type='text'
            className='border-gray-300 h-6 text-sm'
            value={updatedDescription}
            onChange={handleDescriptionChange}
            data-testid='edit-input'
          />
        ) : (
          description
        )}
      </TableCell>
      <TableCell className='text-center'>
        {isEditing && (
          <input type='checkbox' checked={updatedCurrent} onChange={handleCurrentChange} data-testid='edit-checkbox' />
        )}
        {!isEditing &&
          (updatedCurrent ? (
            <span className='text-green-600 font-semibold'>si</span>
          ) : (
            <span className='text-red-600 font-semibold'>no</span>
          ))}
      </TableCell>
      <TableCell className='flex gap-2 justify-center'>
        {isEditing && (
          <>
            <button data-testid='confirm-edit-button' onClick={handleSubmit}>
              <ConfirmIcon />
            </button>
            <button data-testid='cancel-edit-button' onClick={handleIsEditing}>
              <CancelIcon />
            </button>
          </>
        )}
        {!isEditing && (
          <>
            <button data-testid='edit-button' onClick={handleIsEditing}>
              <PencilSquareIcon />
            </button>
            <button data-testid='delete-button' onClick={() => handleDeleteTask(id)}>
              <TrashIcon />
            </button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};
