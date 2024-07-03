import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from '@tremor/react';
import { PencilSquareIcon } from '../icons/PencilSquareIcon';
import { TrashIcon } from '../icons/TrashIcon';
import { NewTaskForm } from './NewTaskForm';

const tasks = [
  { id: 1, description: 'Hacer la compra', current: true },
  { id: 2, description: 'Llamar al médico', current: false },
  { id: 3, description: 'Preparar la presentación', current: true },
  { id: 4, description: 'Lavar el auto', current: false },
  { id: 5, description: 'Enviar el informe', current: true },
];

export const TodoList = () => {
  return (
    <>
      <NewTaskForm />
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
                <button onClick={() => console.log('editar')}>
                  <PencilSquareIcon />
                </button>
                <button onClick={() => console.log('eliminar')}>
                  <TrashIcon />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
