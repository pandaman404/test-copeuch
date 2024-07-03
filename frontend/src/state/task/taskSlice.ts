import type { Task, TaskId } from '../../@types/Task';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createTask, deleteTask, getAllTasks, updateTask } from '../../api/task';

export interface TaskState {
  tasks: Task[];
  loading: boolean;
}

const initialState: TaskState = {
  tasks: [] as Task[],
  loading: false,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Casos para getTasksAsync
      .addCase(getTasksAsync.pending, (state) => {
        console.log('getTasksAsync.pending');
        state.loading = true;
      })
      .addCase(getTasksAsync.fulfilled, (state, action) => {
        console.log('getTasksAsync.fulfilled');
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(getTasksAsync.rejected, (state) => {
        console.log('getTasksAsync.rejected');
        state.loading = false;
      })
      // Casos para createTaskAsync
      .addCase(createTaskAsync.pending, (state) => {
        console.log('createTaskAsync.pending');
        state.loading = true;
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        console.log('createTaskAsync.fulfilled');
        state.tasks.push(action.payload);
        state.loading = false;
      })
      .addCase(createTaskAsync.rejected, (state) => {
        console.log('createTaskAsync.rejected');
        state.loading = false;
      })
      // Casos para deleteTaskAsync
      .addCase(deleteTaskAsync.pending, (state) => {
        console.log('deleteTaskAsync.pending');
        state.loading = true;
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        console.log('deleteTaskAsync.fulfilled');
        const { id } = action.payload;
        state.tasks = state.tasks.filter((task) => task.id != id);
        state.loading = false;
      })
      .addCase(deleteTaskAsync.rejected, (state) => {
        console.log('deleteTaskAsync.rejected');
        state.loading = false;
      })
      // Casos para updateTaskAsync
      .addCase(updateTaskAsync.pending, (state) => {
        console.log('updateTaskAsync.pending');
        state.loading = true;
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        console.log('updateTaskAsync.fulfilled');
        const taskUpdated = action.payload;
        const index = state.tasks.findIndex((task) => task.id === taskUpdated.id);
        state.tasks[index] = taskUpdated;
        state.loading = false;
      })
      .addCase(updateTaskAsync.rejected, (state) => {
        console.log('updateTaskAsync.rejected');
        state.loading = false;
      });
  },
});

export const createTaskAsync = createAsyncThunk<Task, string, { rejectValue: string }>(
  'task/createTaskAsync',
  async (description: string, { rejectWithValue }) => {
    try {
      const taskCreated = await createTask(description);
      return taskCreated;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('ups!');
      }
    }
  }
);

export const getTasksAsync = createAsyncThunk<Task[], void, { rejectValue: string }>(
  'task/getTasksAsync',
  async (_, { rejectWithValue }) => {
    try {
      const tasks = await getAllTasks();
      return tasks;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('ups!');
      }
    }
  }
);

export const deleteTaskAsync = createAsyncThunk<{ id: number; message: string }, TaskId, { rejectValue: string }>(
  'task/deleteTaskAsync',
  async (id: TaskId, { rejectWithValue }) => {
    try {
      const message = await deleteTask(id);
      return {
        id,
        message,
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('ups!');
      }
    }
  }
);

export const updateTaskAsync = createAsyncThunk<Task, Partial<Task>, { rejectValue: string }>(
  'task/updateTaskAsync',
  async (task: Partial<Task>, { rejectWithValue }) => {
    try {
      const taskUpdated = await updateTask(task);
      return taskUpdated;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      } else {
        return rejectWithValue('ups!');
      }
    }
  }
);

export default taskSlice.reducer;
