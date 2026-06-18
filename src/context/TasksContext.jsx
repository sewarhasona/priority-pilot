import { createContext, useContext, useState, useEffect } from 'react';

const TasksContext = createContext(null);

const lightTheme = {
  bgPage: '#ffffff',
  bgCard: '#f8fafc',
  bgInput: '#ffffff',
  textPrimary: '#1e293b',
  textSecondary: '#64748b',
  textMuted: '#94a3b8',
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
};

const darkTheme = {
  bgPage: '#0f172a',
  bgCard: '#1e293b',
  bgInput: '#334155',
  textPrimary: '#f1f5f9',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  border: '#334155',
  borderLight: '#1e293b',
};

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'סריקת סילבוס', done: false },
    { id: 2, text: 'תרגול מתמטיקה', done: false },
    { id: 3, text: 'כתיבת דוח', done: false },
  ]);
  const [tasksByDay, setTasksByDay] = useState({});
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    document.body.style.backgroundColor = darkMode ? '#0f172a' : '';
  }, [darkMode]);

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <TasksContext.Provider value={{ tasks, setTasks, tasksByDay, setTasksByDay, darkMode, setDarkMode, theme }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  return useContext(TasksContext);
}
