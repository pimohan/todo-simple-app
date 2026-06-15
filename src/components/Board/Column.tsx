import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import { Task } from '../../types';
import { ColumnDef } from '../../types';
import { useTasksContext } from '../../context/TasksContext';
import TaskCard from './TaskCard';
import './Column.css';

interface ColumnProps {
  column: ColumnDef;
  tasks: Task[];
}

const COLUMN_ICONS: Record<string, string> = {
  todo: '○',
  'in-progress': '◑',
  done: '●',
};

const EMPTY_MESSAGES: Record<string, string> = {
  todo: 'No tasks planned yet',
  'in-progress': 'Nothing in progress',
  done: 'No completed tasks',
};

const Column: React.FC<ColumnProps> = ({ column, tasks }) => {
  const { openAddModal } = useTasksContext();
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  const taskIds = tasks.map((t) => t.id);

  return (
    <div
      className={`column ${isOver ? 'column--over' : ''}`}
      style={{ '--col-accent': column.color, '--col-accent-glow': column.color + '33' } as React.CSSProperties}
    >
      {/* Column header */}
      <div className="column-header">
        <div className="column-header-left">
          <span className="column-icon">{COLUMN_ICONS[column.id]}</span>
          <h2 className="column-title">{column.title}</h2>
          <span className="column-count">{tasks.length}</span>
        </div>
        <button
          className="column-add-btn"
          onClick={openAddModal}
          aria-label={`Add task to ${column.title}`}
          title="Add task"
        >
          <Plus size={14} strokeWidth={2.5} />
        </button>
      </div>

      {/* Accent bar */}
      <div className="column-accent-bar" />

      {/* Card list */}
      <div ref={setNodeRef} className="column-content">
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.length > 0 ? (
            <div className="column-cards">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          ) : (
            <div className="column-empty">
              <div className="column-empty-icon" style={{ color: column.color }}>
                {COLUMN_ICONS[column.id]}
              </div>
              <p className="column-empty-text">{EMPTY_MESSAGES[column.id]}</p>
              <button className="column-empty-btn" onClick={openAddModal}>
                Add a task
              </button>
            </div>
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
