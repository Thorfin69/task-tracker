const STORAGE_KEYS = {
  USER: 'taskTracker_user',
  TASKS: 'taskTracker_tasks',
};

// User operations
export const setUser = (username) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, username);
  } catch (error) {
    console.error('Failed to save user:', error);
  }
};

export const getUser = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.error('Failed to get user:', error);
    return null;
  }
};

export const clearUser = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.error('Failed to clear user:', error);
  }
};

// Task operations
export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks:', error);
  }
};

export const getTasks = () => {
  try {
    const tasksJson = localStorage.getItem(STORAGE_KEYS.TASKS);
    return tasksJson ? JSON.parse(tasksJson) : [];
  } catch (error) {
    console.error('Failed to get tasks:', error);
    return [];
  }
};

export const clearTasks = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.TASKS);
  } catch (error) {
    console.error('Failed to clear tasks:', error);
  }
};

// Utility functions
export const generateId = () => {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    console.error('Failed to format date:', error);
    return 'Invalid date';
  }
};
