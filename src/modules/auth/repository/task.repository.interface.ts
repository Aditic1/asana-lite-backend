import type { Task, TaskStatus } from '@/generated/prisma/client.js';

export interface CreateTaskModel {
  title: string;
  description: string | null;
  createdBy: string;
}

export interface UpdateTaskDataModel {
  status?: TaskStatus;
  title?: string;
  description?: string | null;
}

export interface TaskRepository {
  createTask: (task: CreateTaskModel) => Promise<Task>;
  deleteTask: (taskId: string) => Promise<Task>;
  updateTask: (taskId: string, updateData: UpdateTaskDataModel) => Promise<Task>;
  findTasksByUserId: (userId: string) => Promise<Task[]>;
  findTaskById: (taskId: string) => Promise<Task | null>;
}
