import { useState, useEffect, useMemo } from 'react';
import { LogOut, User } from 'lucide-react';
import { getTasks, saveTasks, generateId, clearUser } from '../utils/localStorage';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import Toast from './ui/Toast';
import '../styles/App.css';

const Dashboard = ({ username, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const savedTasks = getTasks();
      setTasks(savedTasks);
      setIsLoading(false);
    };
    loadTasks();
  }, []);

  const showToast = (msg) => {
    // Ensure toast is shown even for same messages
    setToastMsg(`${msg} • ${Date.now()}`);
  };

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'pending':
        return tasks.filter(task => !task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const taskCounts = useMemo(() => ({
    all: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
  }), [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: generateId(),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    showToast(`Task "${newTask.title}" added.`);
  };

  const toggleTaskComplete = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        const updatedTask = {
          ...task,
          completed: !task.completed,
          updatedAt: new Date().toISOString(),
        };
        showToast(`Task "${task.title}" ${updatedTask.completed ? 'completed' : 'reopened'}.`);
        return updatedTask;
      }
      return task;
    });
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const editTask = (id, taskData) => {
    const updatedTasks = tasks.map(task =>
      task.id === id
        ? { ...task, ...taskData, updatedAt: new Date().toISOString() }
        : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    showToast(`Task "${taskData.title}" updated.`);
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find(task => task.id === id);
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    showToast(`Task "${taskToDelete?.title}" deleted.`);
  };

  const handleLogout = () => {
    clearUser();
    onLogout();
    showToast('Logged out successfully.');
  };

  if (isLoading) {
    return (
      <div className="dashboard-loader">
        <div className="spinner" />
        <p>Loading your tasks...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="dashboard-user">
          <div className="user-icon-wrapper">
            <User className="user-icon" />
          </div>
          <div>
            <h1>Welcome back, {username}!</h1>
            <p>
              {taskCounts.pending > 0
                ? `You have ${taskCounts.pending} pending task${taskCounts.pending !== 1 ? 's' : ''}`
                : 'All tasks completed! 🎉'}
            </p>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-button">
          <LogOut className="logout-icon" /> Logout
        </button>
      </header>

      <main className="dashboard-main">
        <section>
          <h2>Add New Task</h2>
          <TaskForm onSubmit={addTask} />
        </section>

        <section>
          <div className="task-header">
            <h2>Your Tasks</h2>
            <TaskFilter
              activeFilter={filter}
              onFilterChange={setFilter}
              counts={taskCounts}
            />
          </div>

          <TaskList
            tasks={filteredTasks}
            onToggleComplete={toggleTaskComplete}
            onEdit={editTask}
            onDelete={deleteTask}
            filter={filter}
          />
        </section>
      </main>

      {/* Toast Notification */}
      {toastMsg && (
        <Toast message={toastMsg} onClose={() => setToastMsg('')} />
      )}
    </div>
  );
};

export default Dashboard;
