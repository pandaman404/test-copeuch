export interface Task {
  id: TaskId;
  description: string;
  createdAt: string;
  current: boolean;
}

export type TaskId = number;
