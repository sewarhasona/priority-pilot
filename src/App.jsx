import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
// ייבוא דפים מתוך תיקיית pages
import DashboardPage from './pages/DashboardPage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';
// אם יש לך דף יומן, ודאי שגם הוא נמצא בתיקיית pages
import CalendarPage from './pages/CalendarPage'; 

export default function App() {
  return (
    <HashRouter>
      {/* Navbar מחוץ ל-Routes כדי שיוצג תמיד */}
      <Navbar />
      
      {/* עטיפה לתוכן הדפים */}
      <div style={{ paddingBottom: '70px', paddingTop: '20px' }}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}