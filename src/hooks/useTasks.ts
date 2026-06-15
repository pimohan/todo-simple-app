import { useState, useCallback } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import { Task, Status, TaskFormData } from '../types';
import { INITIAL_TASKS } from '../constants/initialData';
import { useLocalStorage } from './useLocalStorage';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('flowboard-tasks', INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredTasks = tasks.filter((task) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      task.title.toLowerCase().includes(q) ||
      task.description.toLowerCase().includes(q);
    const matchesFilter =
      activeFilter === 'all' ||
      task.category === activeFilter ||
      task.priority === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getTasksByStatus = useCallback(
    (status: Status) => filteredTasks.filter((t) => t.status === status),
    [filteredTasks]
  );

  const findTaskById = useCallback(
    (id: string) => tasks.find((t) => t.id === id),
    [tasks]
  );

  const addTask = useCallback(
    (data: TaskFormData) => {
      const newTask: Task = {
        ...data,
        id: `task-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [...prev, newTask]);
    },
    [setTasks]
  );

  const updateTask = useCallback(
    (id: string, data: TaskFormData) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...data } : t))
      );
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id: string) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    },
    [setTasks]
  );

  const moveTask = useCallback(
    (taskId: string, newStatus: Status) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
      );
    },
    [setTasks]
  );

  const reorderTasks = useCallback(
    (activeId: string, overId: string) => {
      setTasks((prev) => {
        const activeIndex = prev.findIndex((t) => t.id === activeId);
        const overIndex = prev.findIndex((t) => t.id === overId);
        if (activeIndex === -1 || overIndex === -1) return prev;
        return arrayMove(prev, activeIndex, overIndex);
      });
    },
    [setTasks]
  );

  const resetTasks = useCallback(() => {
    setTasks(INITIAL_TASKS);
  }, [setTasks]);

  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
  };

  return {
    tasks,
    filteredTasks,
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    getTasksByStatus,
    findTaskById,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    reorderTasks,
    resetTasks,
    stats,
  };
}
