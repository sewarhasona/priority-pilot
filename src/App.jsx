import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';
import CalendarPage from './pages/CalendarPage';
import { TasksProvider } from './context/TasksContext';

export default function App() {
  return (
    <TasksProvider>
      <HashRouter>
        <Navbar />
        <div style={{ paddingBottom: '70px', paddingTop: '20px' }}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </HashRouter>
    </TasksProvider>
  );
}