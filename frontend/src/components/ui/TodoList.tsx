import { Table, TableBody, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import { AppDispatch, RootState } from '../../state/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTasksAsync } from '../../state/task/taskSlice';
import { useAppSelector } from '../../state/hooks/useAppSelector';
import { TodoRow } from './TodoRow';

export const TodoList = () => {
  const { tasks } = useAppSelector((state: RootState) => state.task);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getTasksAsync());
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
        {tasks.map((task) => (
          <TodoRow key={task.id} task={task} />
        ))}
      </TableBody>
    </Table>
  );
};
