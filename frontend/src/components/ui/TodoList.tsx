import { Table, TableBody, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import { TodoRow } from './TodoRow';
import { useTodoList } from '../../hooks/useTodoList';

export const TodoList = () => {
  const { tasks } = useTodoList();

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
