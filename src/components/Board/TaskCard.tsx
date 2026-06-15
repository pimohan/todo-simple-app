import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit3, Trash2, Calendar, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Task } from '../../types';
import { PRIORITY_CONFIG, CATEGORY_CONFIG } from '../../constants/columns';
import { useTasksContext } from '../../context/TasksContext';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.ceil((date.getTime() - now.getTime()) / 86400000);
  if (diffDays < 0) return `${Math.abs(diffDays)}d overdue`;
  if (diffDays === 0) return 'Due today';
  if (diffDays === 1) return 'Due tomorrow';
  if (diffDays < 7) return `Due in ${diffDays}d`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function isOverdue(dateStr: string): boolean {
  return new Date(dateStr) < new Date();
}

const STATUS_ICONS: Record<string, React.ReactNode> = {
  todo: <Clock size={10} />,
  'in-progress': <AlertCircle size={10} />,
  done: <CheckCircle2 size={10} />,
};

const TaskCard: React.FC<TaskCardProps> = ({ task, isOverlay = false }) => {
  const { deleteTask, openEditModal } = useTasksContext();
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, disabled: isOverlay });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  const priority = PRIORITY_CONFIG[task.priority];
  const category = CATEGORY_CONFIG[task.category];
  const overdue = task.dueDate ? isOverdue(task.dueDate) : false;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (showConfirm) {
      deleteTask(task.id);
    } else {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 2500);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    openEditModal(task);
  };

  return (
    <div
      ref={isOverlay ? undefined : setNodeRef}
      style={isOverlay ? undefined : style}
      className={`task-card ${isDragging ? 'task-card--dragging' : ''} ${isOverlay ? 'task-card--overlay' : ''}`}
      data-priority={task.priority}
      onMouseLeave={() => setShowConfirm(false)}
    >
      {/* Priority stripe */}
      <div className="task-priority-stripe" style={{ background: priority.color }} />

      {/* Main content */}
      <div className="task-body">
        {/* Top row: drag handle + category + actions */}
        <div className="task-top">
          <div className="task-drag-handle" {...(isOverlay ? {} : { ...listeners, ...attributes })}>
            <GripVertical size={14} />
          </div>
          <span
            className="task-category"
            style={{ background: category.bg, color: category.color }}
          >
            {category.icon} {category.label}
          </span>
          <div className="task-actions">
            <button
              className="task-btn task-btn--edit"
              onClick={handleEdit}
              aria-label="Edit task"
              title="Edit"
            >
              <Edit3 size={13} />
            </button>
            <button
              className={`task-btn task-btn--delete ${showConfirm ? 'confirm' : ''}`}
              onClick={handleDelete}
              aria-label={showConfirm ? 'Confirm delete' : 'Delete task'}
              title={showConfirm ? 'Click again to confirm' : 'Delete'}
            >
              <Trash2 size={13} />
              {showConfirm && <span className="confirm-label">Sure?</span>}
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className={`task-title ${task.status === 'done' ? 'task-title--done' : ''}`}>
          {task.title}
        </h3>

        {/* Description */}
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        {/* Bottom row: priority + status + due date */}
        <div className="task-meta">
          <span
            className="task-priority"
            style={{ background: priority.bg, color: priority.color }}
          >
            {priority.label}
          </span>

          <span className="task-status-badge">
            {STATUS_ICONS[task.status]}
          </span>

          {task.dueDate && (
            <span className={`task-due ${overdue && task.status !== 'done' ? 'task-due--overdue' : ''}`}>
              <Calendar size={11} />
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
