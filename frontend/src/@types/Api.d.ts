import type { Task } from './Task';

interface ApiResponse<T> {
  status: number;
  message?: string;
  data?: T;
}

export interface ApiTaskResponse extends ApiResponse<Task> {}

export interface ApiTaskListResponse extends ApiResponse<Task[]> {}

export interface ApiMessageResponse extends ApiResponse<null> {
  message: string;
}
