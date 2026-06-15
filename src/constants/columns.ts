import { ColumnDef } from '../types';

export const COLUMNS: ColumnDef[] = [
  {
    id: 'todo',
    title: 'To Do',
    color: '#7c3aed',
    lightColor: '#a78bfa',
    gradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    color: '#0ea5e9',
    lightColor: '#38bdf8',
    gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
  },
  {
    id: 'done',
    title: 'Done',
    color: '#10b981',
    lightColor: '#34d399',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
];

export const PRIORITY_CONFIG = {
  high: { color: '#ef4444', label: 'High', bg: 'rgba(239,68,68,0.12)' },
  medium: { color: '#f59e0b', label: 'Medium', bg: 'rgba(245,158,11,0.12)' },
  low: { color: '#10b981', label: 'Low', bg: 'rgba(16,185,129,0.12)' },
};

export const CATEGORY_CONFIG = {
  work: { color: '#3b82f6', label: 'Work', bg: 'rgba(59,130,246,0.15)', icon: '💼' },
  personal: { color: '#8b5cf6', label: 'Personal', bg: 'rgba(139,92,246,0.15)', icon: '👤' },
  shopping: { color: '#f59e0b', label: 'Shopping', bg: 'rgba(245,158,11,0.15)', icon: '🛒' },
  health: { color: '#ef4444', label: 'Health', bg: 'rgba(239,68,68,0.15)', icon: '❤️' },
  other: { color: '#6b7280', label: 'Other', bg: 'rgba(107,114,128,0.15)', icon: '📁' },
};
