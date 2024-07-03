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
      .addCase(getTasksAsync.pending, (state) => {})
      .addCase(getTasksAsync.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(getTasksAsync.rejected, (state, action) => {})
      // Casos para createTaskAsync
      .addCase(createTaskAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.loading = false;
      })
      .addCase(createTaskAsync.rejected, (state, action) => {
        state.loading = false;
      })
      // Casos para deleteTaskAsync
      .addCase(deleteTaskAsync.pending, (state) => {})
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        const { id, message } = action.payload;
        state.tasks = state.tasks.filter((task) => task.id != id);
      })
      .addCase(deleteTaskAsync.rejected, (state, action) => {})
      // Casos para updateTaskAsync
      .addCase(updateTaskAsync.pending, (state) => {})
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        const taskUpdated = action.payload;
        const index = state.tasks.findIndex((task) => task.id === taskUpdated.id);
        state.tasks[index] = taskUpdated;
      })
      .addCase(updateTaskAsync.rejected, (state, action) => {});
  },
});

export const createTaskAsync = createAsyncThunk(
  'task/createTaskAsync',
  async (description: string, { rejectWithValue }) => {
    try {
      const taskCreated = await createTask(description);
      return taskCreated;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getTasksAsync = createAsyncThunk('task/getTasksAsync', async (_, { rejectWithValue }) => {
  try {
    const tasks = await getAllTasks();
    return tasks;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteTaskAsync = createAsyncThunk('task/deleteTaskAsync', async (id: TaskId, { rejectWithValue }) => {
  try {
    const message = await deleteTask(id);
    return {
      id,
      message,
    };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateTaskAsync = createAsyncThunk(
  'task/updateTaskAsync',
  async (task: Partial<Task>, { rejectWithValue }) => {
    try {
      const taskUpdated = await updateTask(task);
      return taskUpdated;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default taskSlice.reducer;
