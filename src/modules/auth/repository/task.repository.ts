import type {
  CreateTaskModel,
  TaskRepository,
  UpdateTaskDataModel,
} from './task.repository.interface.js';

import { prisma } from '@/common/config/prisma.js';
import type { Task } from '@/generated/prisma/client.js';

const createTask = async (task: CreateTaskModel): Promise<Task> => {
  const taskCreated = await prisma.task.create({
    data: {
      title: task.title,
      description: task.description,
      createdBy: task.createdBy,
    },
  });
  return taskCreated;
};

const findTasksByUserId = async (userId: string): Promise<Task[]> => {
  const tasks = await prisma.task.findMany({ where: { createdBy: userId } });
  return tasks;
};

const findTaskById = async (taskId: string): Promise<Task | null> => {
  const taskDetails = await prisma.task.findUnique({ where: { id: taskId } });
  return taskDetails;
};

const updateTask = async (taskId: string, updateData: UpdateTaskDataModel): Promise<Task> => {
  const updatedTask = await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      ...updateData,
    },
  });
  return updatedTask;
};

const deleteTask = async (taskId: string): Promise<Task> => {
  const deletedTask = await prisma.task.delete({
    where: {
      id: taskId,
    },
  });
  return deletedTask;
};

export const taskRepo: TaskRepository = {
  createTask: createTask,
  deleteTask: deleteTask,
  updateTask: updateTask,
  findTaskById: findTaskById,
  findTasksByUserId: findTasksByUserId,
};
