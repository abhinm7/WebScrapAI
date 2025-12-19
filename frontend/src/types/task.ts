export type TaskStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface CreateTaskResponse {
  taskId: string;
  status: TaskStatus;
}

export interface Task {
  id: string;
  url: string;
  question: string;
  status: TaskStatus;
  answer?: string | null;
  createdAt: string;
}
