import React, { useState } from 'react';
import { Check, Edit3, Trash2, Calendar, FileText } from 'lucide-react';
import TaskForm from './TaskForm';
import { formatDate } from '../utils/LocalStorage';
import '../styles/App.css';

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleEdit = (data) => {
    onEdit(task.id, data);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
    setShowDeleteDialog(false);
  };

  if (isEditing) {
    return (
      <TaskForm
        task={task}
        onSubmit={handleEdit}
        onCancel={() => setIsEditing(false)}
        isEditing={true}
      />
    );
  }

  return (
    <>
      <div className={`task-card ${task.completed ? 'task-complete' : ''}`}>
        <div className="task-inner">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="task-checkbox"
          />

          <div className="task-details">
            <div className={`task-title ${task.completed ? 'completed' : ''}`}>
              {task.title}
            </div>

            {task.description && (
              <div className="task-description">
                <FileText className="icon-sm" />
                <span>{task.description}</span>
              </div>
            )}

            <div className="task-meta">
              <Calendar className="icon-sm" />
              <span>Created {formatDate(task.createdAt)}</span>
              {task.completed && (
                <span className="task-done">
                  <Check className="icon-sm text-green" />
                  <span className="text-green">Completed</span>
                </span>
              )}
            </div>
          </div>

          <div className="task-actions">
            <button
              className="task-btn"
              onClick={() => setIsEditing(true)}
              disabled={task.completed}
            >
              <Edit3 className="icon-sm" />
            </button>
            <button
              className="task-btn delete"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="icon-sm" />
            </button>
          </div>
        </div>
      </div>

      {showDeleteDialog && (
        <div className="dialog-overlay">
          <div className="dialog">
            <h3>Delete Task</h3>
            <p>Are you sure you want to delete "{task.title}"? This action cannot be undone.</p>
            <div className="dialog-buttons">
              <button onClick={() => setShowDeleteDialog(false)}>Cancel</button>
              <button onClick={handleDelete} className="danger">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskItem;
