import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import { PencilSquareIcon } from '../icons/PencilSquareIcon';
import { TrashIcon } from '../icons/TrashIcon';
import { useAppSelector } from '../../hooks/store';
import { useTaskActions } from '../../layout/useTaskActions';
import { useEffect } from 'react';
import { getAllTasks } from '../../api/task';

export const TodoList = () => {
  const tasks = useAppSelector((state) => state.tasks);
  const { deleteTask } = useTaskActions();

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <Table className='mt-8 w-full'>
      <TableHead>
        <TableRow className='border-b border-tremor-border dark:border-dark-tremor-border'>
          <TableHeaderCell className='text-tremor-content-strong dark:text-dark-tremor-content-strong'>
            Id
          </TableHeaderCell>
          <TableHeaderCell className='text-tremor-content-strong dark:text-dark-tremor-content-strong'>
            Tareas
          </TableHeaderCell>
          <TableHeaderCell className='text-tremor-content-strong dark:text-dark-tremor-content-strong'>
            Vigente
          </TableHeaderCell>
          <TableHeaderCell className='text-tremor-content-strong dark:text-dark-tremor-content-strong text-center'>
            Acciones
          </TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map((item) => (
          <TableRow key={item.id}>
            <TableCell className='font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
              {item.id}
            </TableCell>
            <TableCell className='font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
              {item.description}
            </TableCell>
            <TableCell>{item.current ? 'true' : 'false'}</TableCell>
            <TableCell className='flex gap-2 justify-center'>
              <button onClick={() => console.log(item.id)}>
                <PencilSquareIcon />
              </button>
              <button onClick={() => deleteTask(item.id)}>
                <TrashIcon />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
