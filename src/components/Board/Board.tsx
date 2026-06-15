import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import { useTasksContext } from '../../context/TasksContext';
import { COLUMNS } from '../../constants/columns';
import { Status } from '../../types';
import Column from './Column';
import TaskCard from './TaskCard';
import './Board.css';

const Board: React.FC = () => {
  const { getTasksByStatus, findTaskById, moveTask, reorderTasks } = useTasksContext();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeColumnTab, setActiveColumnTab] = useState<Status>('todo');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const activeTask = activeId ? findTaskById(activeId) : null;

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over || active.id === over.id) return;

    const activeTask = findTaskById(active.id as string);
    if (!activeTask) return;

    const isOverColumn = COLUMNS.some((c) => c.id === over.id);
    const targetStatus = isOverColumn
      ? (over.id as Status)
      : findTaskById(over.id as string)?.status;

    if (targetStatus && activeTask.status !== targetStatus) {
      moveTask(active.id as string, targetStatus);
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setActiveId(null);
    if (!over || active.id === over.id) return;

    const activeTask = findTaskById(active.id as string);
    const overTask = findTaskById(over.id as string);

    if (activeTask && overTask && activeTask.status === overTask.status) {
      reorderTasks(active.id as string, over.id as string);
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {/* Mobile column tabs */}
      <div className="board-tabs">
        {COLUMNS.map((col) => (
          <button
            key={col.id}
            className={`board-tab ${activeColumnTab === col.id ? 'active' : ''}`}
            style={{ '--tab-color': col.color } as React.CSSProperties}
            onClick={() => setActiveColumnTab(col.id)}
          >
            <span className="board-tab-label">{col.title}</span>
            <span className="board-tab-count">{getTasksByStatus(col.id).length}</span>
          </button>
        ))}
      </div>

      <div className="board-columns">
        {COLUMNS.map((col, i) => (
          <motion.div
            key={col.id}
            className={`board-column-wrap ${col.id !== activeColumnTab ? 'board-column-hidden' : ''}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Column column={col} tasks={getTasksByStatus(col.id)} />
          </motion.div>
        ))}
      </div>

      <DragOverlay dropAnimation={{ duration: 180, easing: 'ease' }}>
        {activeTask ? (
          <div className="drag-overlay-card">
            <TaskCard task={activeTask} isOverlay />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Board;
