import { type Task } from '../@types/Task';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { store } from '../state/store';
import { Provider } from 'react-redux';
import { TodoRow } from '../components/ui/TodoRow';

describe('TodoRow', () => {
  const task: Task = { id: 1, description: 'test', current: true, createdAt: '' };

  beforeEach(() => {
    render(
      <Provider store={store}>
        <table>
          <tbody>
            <TodoRow task={task} />
          </tbody>
        </table>
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('Debería renderizar una fila de la tabla con los datos de la tarea', () => {
    const idCell = screen.getByText(task.id.toString());
    const descriptionCell = screen.getByText(task.description);
    const currentCell = screen.getByText(task.current ? 'si' : 'no');

    expect(idCell).toBeTruthy();
    expect(descriptionCell).toBeTruthy();
    expect(currentCell).toBeTruthy();
  });

  test('Al hacer clic en el botón de editar, la interfaz de la fila debería cambiar', () => {
    const editButton = screen.getByTestId('edit-button');
    fireEvent.click(editButton);

    const editInput = screen.getByTestId('edit-input');
    const editCheckbox = screen.getByTestId('edit-checkbox');
    const confirmEditButton = screen.getByTestId('confirm-edit-button');
    const cancelEditButton = screen.getByTestId('cancel-edit-button');

    expect(editInput).toBeTruthy();
    expect(editCheckbox).toBeTruthy();
    expect(confirmEditButton).toBeTruthy();
    expect(cancelEditButton).toBeTruthy();
  });
});
