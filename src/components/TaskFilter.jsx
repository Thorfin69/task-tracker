import React from 'react';
import { CheckCircle, Circle, List } from 'lucide-react';
import '../styles/App.css';

const TaskFilter = ({ activeFilter, onFilterChange, counts }) => {
  const filters = [
    {
      key: 'all',
      label: 'All Tasks',
      icon: List,
      count: counts.all,
    },
    {
      key: 'pending',
      label: 'Pending',
      icon: Circle,
      count: counts.pending,
    },
    {
      key: 'completed',
      label: 'Completed',
      icon: CheckCircle,
      count: counts.completed,
    },
  ];

  return (
    <div className="task-filter">
      {filters.map((filter) => {
        const Icon = filter.icon;
        const isActive = activeFilter === filter.key;

        return (
          <button
            key={filter.key}
            className={`filter-button ${isActive ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.key)}
          >
            <Icon className="filter-icon" />
            <span>{filter.label}</span>
            <span className={`filter-badge ${isActive ? 'badge-active' : ''}`}>
              {filter.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default TaskFilter;
