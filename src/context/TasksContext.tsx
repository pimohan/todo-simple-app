import React, { createContext, useContext, useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { Task } from '../types';

type TasksContextType = ReturnType<typeof useTasks> & {
  isModalOpen: boolean;
  editingTask: Task | null;
  openAddModal: () => void;
  openEditModal: (task: Task) => void;
  closeModal: () => void;
};

const TasksContext = createContext<TasksContextType | null>(null);

export const TasksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const taskManager = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const openAddModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <TasksContext.Provider
      value={{ ...taskManager, isModalOpen, editingTask, openAddModal, openEditModal, closeModal }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasksContext must be used inside TasksProvider');
  return ctx;
};
