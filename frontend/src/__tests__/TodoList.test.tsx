import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, test } from 'vitest';
import { TodoList } from '../components/ui/TodoList';
import { store } from '../state/store';

describe('TodoList', () => {
  test('Debería renderizar el numero de tareas', () => {
    render(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
    const tasksCount = screen.getByTestId('tasks-count');
    expect(tasksCount.textContent).toContain('0'); // Verifica que el texto contenga '0'
  });
});
