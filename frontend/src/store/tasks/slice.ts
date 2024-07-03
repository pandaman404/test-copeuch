import type { TaskId, Task } from '../../@types/Task';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: Task[] = [
  { id: 1, description: 'Hacer la compra', current: true, createdAt: 'hoy' },
  { id: 2, description: 'Llamar al médico', current: false, createdAt: 'hoy' },
  { id: 3, description: 'Preparar la presentación', current: true, createdAt: 'hoy' },
  { id: 4, description: 'Lavar el auto', current: false, createdAt: 'hoy' },
  { id: 5, description: 'Enviar el informe', current: true, createdAt: 'hoy' },
];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    deleteTaskById: (state, action: PayloadAction<TaskId>) => {
      const id = action.payload;
      return state.filter((user) => user.id !== id);
    },
  },
});

export const { deleteTaskById } = tasksSlice.actions;

export default tasksSlice.reducer;
