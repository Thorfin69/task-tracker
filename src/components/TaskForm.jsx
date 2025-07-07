import React, { useState, useEffect } from 'react';
import { Plus, Edit3, X } from 'lucide-react';
import '../styles/App.css';

const TaskForm = ({ task, onSubmit, onCancel, isEditing = false }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 300));

    onSubmit({
      title: title.trim(),
      description: description.trim(),
    });

    if (!isEditing) {
      setTitle('');
      setDescription('');
    }

    setIsSubmitting(false);
  };

  const handleCancel = () => {
    if (isEditing) {
      setTitle(task?.title || '');
      setDescription(task?.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
    onCancel?.();
  };

  return (
    <div className="task-form-card">
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            id="title"
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Add more details... (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-button"
            disabled={!title.trim() || isSubmitting}
          >
            {isSubmitting ? (
              <div className="btn-loading">
                <div className="spinner" />
                {isEditing ? 'Updating...' : 'Adding...'}
              </div>
            ) : (
              <div className="btn-content">
                {isEditing ? <Edit3 className="btn-icon" /> : <Plus className="btn-icon" />}
                {isEditing ? 'Update Task' : 'Add Task'}
              </div>
            )}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
              disabled={isSubmitting}
            >
              <X className="btn-icon" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
