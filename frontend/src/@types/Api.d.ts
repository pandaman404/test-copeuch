import type { Task } from './Task';

export interface ApiTaskListResponse {
  status: number;
  data: Task[];
}

export interface ApiTaskResponse {
  status: number;
  data: Task;
}

export interface ApiMessageResponse {
  status: number;
  message: string;
}
