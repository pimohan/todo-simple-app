export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'done';
export type Category = 'work' | 'personal' | 'shopping' | 'health' | 'other';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  category: Category;
  createdAt: string;
  dueDate?: string;
}

export interface ColumnDef {
  id: Status;
  title: string;
  color: string;
  lightColor: string;
  gradient: string;
}

export interface TaskStats {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  category: Category;
  dueDate: string;
}
