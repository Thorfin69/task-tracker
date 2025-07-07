import React from 'react';
import TaskItem from './TaskItem';
import { CheckCircle, ListTodo } from 'lucide-react';
import '../styles/App.css';

const TaskList = ({ tasks, onToggleComplete, onEdit, onDelete, filter }) => {
  if (tasks.length === 0) {
    return (
      <div className="tasklist-empty">
        <div className="tasklist-icon-wrapper">
          {filter === 'completed' ? (
            <CheckCircle className="tasklist-icon" />
          ) : (
            <ListTodo className="tasklist-icon" />
          )}
        </div>
        <h3 className="tasklist-title">
          {filter === 'completed' && 'No completed tasks yet'}
          {filter === 'pending' && 'No pending tasks'}
          {filter === 'all' && 'No tasks yet'}
        </h3>
        <p className="tasklist-description">
          {filter === 'completed' && 'Complete some tasks to see them here.'}
          {filter === 'pending' && 'All your tasks are completed! Great job.'}
          {filter === 'all' && 'Create your first task to get started with your productivity journey.'}
        </p>
      </div>
    );
  }

  return (
    <div className="tasklist-container">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
