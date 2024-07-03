import { Task } from './Task';

export interface ApiResponse {
  status: number;
  message?: string;
  data?: Task | Task[];
}
