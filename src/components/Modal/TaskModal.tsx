import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { Priority, Status, Category, TaskFormData } from '../../types';
import { useTasksContext } from '../../context/TasksContext';
import './TaskModal.css';

const PRIORITIES: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: '#10b981' },
  { value: 'medium', label: 'Medium', color: '#f59e0b' },
  { value: 'high', label: 'High', color: '#ef4444' },
];

const STATUSES: { value: Status; label: string; icon: string }[] = [
  { value: 'todo', label: 'To Do', icon: '○' },
  { value: 'in-progress', label: 'In Progress', icon: '◑' },
  { value: 'done', label: 'Done', icon: '●' },
];

const CATEGORIES: { value: Category; label: string; icon: string }[] = [
  { value: 'work', label: 'Work', icon: '💼' },
  { value: 'personal', label: 'Personal', icon: '👤' },
  { value: 'shopping', label: 'Shopping', icon: '🛒' },
  { value: 'health', label: 'Health', icon: '❤️' },
  { value: 'other', label: 'Other', icon: '📁' },
];

const BLANK: TaskFormData = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  category: 'work',
  dueDate: '',
};

const TaskModal: React.FC = () => {
  const { isModalOpen, editingTask, closeModal, addTask, updateTask } = useTasksContext();
  const [form, setForm] = useState<TaskFormData>(BLANK);
  const [errors, setErrors] = useState<{ title?: string }>({});

  useEffect(() => {
    if (isModalOpen) {
      if (editingTask) {
        setForm({
          title: editingTask.title,
          description: editingTask.description,
          status: editingTask.status,
          priority: editingTask.priority,
          category: editingTask.category,
          dueDate: editingTask.dueDate || '',
        });
      } else {
        setForm(BLANK);
      }
      setErrors({});
    }
  }, [isModalOpen, editingTask]);

  const validate = (): boolean => {
    if (!form.title.trim()) {
      setErrors({ title: 'Title is required' });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const data: TaskFormData = { ...form, title: form.title.trim() };
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask(data);
    }
    closeModal();
  };

  const set = <K extends keyof TaskFormData>(key: K, value: TaskFormData[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeModal}
        >
          <motion.div
            className="modal-panel"
            initial={{ scale: 0.9, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ type: 'spring', damping: 22, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Header */}
            <div className="modal-header">
              <h2 id="modal-title" className="modal-title">
                {editingTask ? 'Edit Task' : 'New Task'}
              </h2>
              <button className="modal-close" onClick={closeModal} aria-label="Close modal">
                <X size={18} />
              </button>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              {/* Title */}
              <div className={`form-group ${errors.title ? 'form-group--error' : ''}`}>
                <label className="form-label" htmlFor="task-title">Title *</label>
                <input
                  id="task-title"
                  type="text"
                  className="form-input"
                  placeholder="What needs to be done?"
                  value={form.title}
                  onChange={(e) => {
                    set('title', e.target.value);
                    if (errors.title) setErrors({});
                  }}
                  autoFocus
                />
                {errors.title && <span className="form-error">{errors.title}</span>}
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label" htmlFor="task-desc">Description</label>
                <textarea
                  id="task-desc"
                  className="form-textarea"
                  placeholder="Add more details…"
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  rows={3}
                />
              </div>

              {/* Status */}
              <div className="form-group">
                <label className="form-label">Status</label>
                <div className="form-chip-group">
                  {STATUSES.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      className={`form-chip form-chip--status ${form.status === s.value ? 'active' : ''}`}
                      data-status={s.value}
                      onClick={() => set('status', s.value)}
                    >
                      <span>{s.icon}</span>
                      {s.label}
                      {form.status === s.value && <Check size={11} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority */}
              <div className="form-group">
                <label className="form-label">Priority</label>
                <div className="form-chip-group">
                  {PRIORITIES.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      className={`form-chip ${form.priority === p.value ? 'active' : ''}`}
                      style={{ '--chip-color': p.color } as React.CSSProperties}
                      onClick={() => set('priority', p.value)}
                    >
                      <span className="priority-dot" style={{ background: p.color }} />
                      {p.label}
                      {form.priority === p.value && <Check size={11} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="form-group">
                <label className="form-label">Category</label>
                <div className="form-chip-group form-chip-group--wrap">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      className={`form-chip ${form.category === c.value ? 'active' : ''}`}
                      onClick={() => set('category', c.value)}
                    >
                      <span>{c.icon}</span>
                      {c.label}
                      {form.category === c.value && <Check size={11} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Due date */}
              <div className="form-group">
                <label className="form-label" htmlFor="task-due">Due Date</label>
                <input
                  id="task-due"
                  type="date"
                  className="form-input form-input--date"
                  value={form.dueDate}
                  onChange={(e) => set('dueDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button type="button" className="btn-cancel" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit">
                  {editingTask ? 'Save Changes' : 'Add Task'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;
