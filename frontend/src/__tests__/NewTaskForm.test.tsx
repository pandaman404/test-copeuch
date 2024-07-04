import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { NewTaskForm } from '../components/ui/NewTaskForm';
import { Provider } from 'react-redux';
import { store } from '../state/store.ts';

describe('NewTaskForm', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <NewTaskForm />
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  test('El formulario debería resetearse después de enviar una tarea válida', () => {
    const input = screen.getByPlaceholderText(/Realizar prueba tecnica/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'My new task' } });
    const submitButton = screen.getByRole('button', { name: /agregar/i });
    fireEvent.click(submitButton);

    // Verificar que el input se haya reseteado
    expect(input.value).toHaveLength(0);
  });

  test('El formulario debería no realizar ninguna acción si la tarea no es válida', () => {
    const input = screen.getByPlaceholderText(/Realizar prueba tecnica/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '  ' } }); // String vacío
    const submitButton = screen.getByRole('button', { name: /agregar/i });
    fireEvent.click(submitButton);

    // El valor del input debería permanecer igual
    expect(input.value).toHaveLength(2);
  });
});
