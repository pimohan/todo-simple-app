import { Task } from '../types';

const d = (daysAgo: number) => new Date(Date.now() - 86400000 * daysAgo).toISOString();
const due = (daysFromNow: number) => {
  const date = new Date(Date.now() + 86400000 * daysFromNow);
  return date.toISOString().split('T')[0];
};

export const INITIAL_TASKS: Task[] = [
  // ── TO DO ──────────────────────────────────────────────────────────
  {
    id: 'task-1',
    title: 'Implement dark mode toggle',
    description: 'Add a theme switcher to the header that persists user preference via localStorage.',
    status: 'todo',
    priority: 'medium',
    category: 'work',
    createdAt: d(5),
    dueDate: due(8),
  },
  {
    id: 'task-2',
    title: 'Write end-to-end tests',
    description: 'Cover all critical user flows with Playwright tests including drag & drop scenarios.',
    status: 'todo',
    priority: 'high',
    category: 'work',
    createdAt: d(4),
    dueDate: due(5),
  },
  {
    id: 'task-3',
    title: 'Add keyboard navigation',
    description: 'Implement keyboard shortcuts for power users — arrow keys, Enter to edit, Delete to remove.',
    status: 'todo',
    priority: 'low',
    category: 'work',
    createdAt: d(3),
    dueDate: due(14),
  },
  {
    id: 'task-4',
    title: 'Optimize bundle size',
    description: 'Analyze and reduce JavaScript bundle size with tree shaking and lazy loading.',
    status: 'todo',
    priority: 'medium',
    category: 'work',
    createdAt: d(2),
    dueDate: due(10),
  },
  {
    id: 'task-5',
    title: 'Set up error monitoring',
    description: 'Integrate Sentry for production error tracking, source maps, and automated alerting.',
    status: 'todo',
    priority: 'high',
    category: 'work',
    createdAt: d(1),
    dueDate: due(6),
  },

  // ── IN PROGRESS ────────────────────────────────────────────────────
  {
    id: 'task-6',
    title: 'Build responsive layout',
    description: 'Ensure the app works flawlessly on all screen sizes from 320px mobile to 4K desktop.',
    status: 'in-progress',
    priority: 'high',
    category: 'work',
    createdAt: d(7),
    dueDate: due(2),
  },
  {
    id: 'task-7',
    title: 'Drag & drop between columns',
    description: 'Implement smooth multi-container DnD using @dnd-kit with real-time visual feedback.',
    status: 'in-progress',
    priority: 'high',
    category: 'work',
    createdAt: d(6),
    dueDate: due(1),
  },
  {
    id: 'task-8',
    title: 'Design priority system',
    description: 'Create visual hierarchy for task prioritization using color-coded indicators and badges.',
    status: 'in-progress',
    priority: 'medium',
    category: 'work',
    createdAt: d(5),
    dueDate: due(3),
  },
  {
    id: 'task-9',
    title: 'User research interviews',
    description: 'Conduct 5 user interviews to gather feedback on the current workflow and pain points.',
    status: 'in-progress',
    priority: 'medium',
    category: 'personal',
    createdAt: d(4),
    dueDate: due(4),
  },

  // ── DONE ───────────────────────────────────────────────────────────
  {
    id: 'task-10',
    title: 'Project setup & configuration',
    description: 'Initialize React + TypeScript repo, configure ESLint, Prettier, and CI/CD pipeline.',
    status: 'done',
    priority: 'high',
    category: 'work',
    createdAt: d(14),
  },
  {
    id: 'task-11',
    title: 'Define design system',
    description: 'Establish color tokens, typography scale, spacing system, and glassmorphism components.',
    status: 'done',
    priority: 'high',
    category: 'work',
    createdAt: d(12),
  },
  {
    id: 'task-12',
    title: 'Core component architecture',
    description: 'Plan and implement the base component structure with TypeScript interfaces and Context API.',
    status: 'done',
    priority: 'high',
    category: 'work',
    createdAt: d(10),
  },
  {
    id: 'task-13',
    title: 'Git repository & branching',
    description: 'Set up GitHub repo with proper branching strategy, PR templates, and commit conventions.',
    status: 'done',
    priority: 'medium',
    category: 'work',
    createdAt: d(15),
  },
];
