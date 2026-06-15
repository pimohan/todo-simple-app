import React, { useState } from 'react';
import { Search, Plus, LayoutGrid, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTasksContext } from '../../context/TasksContext';
import './Header.css';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'work', label: 'Work' },
  { id: 'personal', label: 'Personal' },
  { id: 'high', label: '🔴 High' },
  { id: 'medium', label: '🟡 Medium' },
  { id: 'low', label: '🟢 Low' },
];

const Header: React.FC = () => {
  const { stats, searchQuery, setSearchQuery, activeFilter, setActiveFilter, openAddModal, resetTasks } = useTasksContext();
  const [showFilters, setShowFilters] = useState(false);

  const completionPct = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0;

  return (
    <header className="header">
      <div className="header-inner">
        {/* Brand row */}
        <div className="header-top">
          <div className="header-brand">
            <div className="header-logo">
              <LayoutGrid size={20} strokeWidth={2.5} />
            </div>
            <div className="header-title-group">
              <h1 className="header-title">FlowBoard</h1>
              <span className="header-subtitle">Kanban Task Manager</span>
            </div>
          </div>

          <div className="header-actions">
            <div className="header-search-wrap">
              <Search className="search-icon" size={16} />
              <input
                type="text"
                className="header-search"
                placeholder="Search tasks…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search tasks"
              />
              {searchQuery && (
                <button className="search-clear" onClick={() => setSearchQuery('')} aria-label="Clear search">
                  <X size={14} />
                </button>
              )}
            </div>

            <button
              className={`btn-filter ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters((p) => !p)}
              aria-label="Toggle filters"
              title="Filters"
            >
              <SlidersHorizontal size={16} />
              <span className="btn-filter-label">Filter</span>
              {activeFilter !== 'all' && <span className="filter-dot" />}
            </button>

            <button
              className="btn-reset"
              onClick={resetTasks}
              aria-label="Reset tasks"
              title="Reset to sample data"
            >
              <RotateCcw size={15} />
            </button>

            <button className="btn-add" onClick={openAddModal} aria-label="Add new task">
              <Plus size={18} strokeWidth={2.5} />
              <span>New Task</span>
            </button>
          </div>
        </div>

        {/* Filter row */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="header-filters"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  className={`filter-pill ${activeFilter === f.id ? 'active' : ''}`}
                  onClick={() => setActiveFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats row */}
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-card stat-todo">
            <span className="stat-value">{stats.todo}</span>
            <span className="stat-label">To Do</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-card stat-progress">
            <span className="stat-value">{stats.inProgress}</span>
            <span className="stat-label">In Progress</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-card stat-done">
            <span className="stat-value">{stats.done}</span>
            <span className="stat-label">Done</span>
          </div>
          <div className="stat-progress-bar-wrap">
            <div className="stat-progress-bar-track">
              <motion.div
                className="stat-progress-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${completionPct}%` }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              />
            </div>
            <span className="stat-progress-pct">{completionPct}% complete</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
