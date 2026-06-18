import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ 
      position: 'fixed', bottom: 0, width: '100%', maxWidth: '480px', 
      background: '#fff', borderTop: '1px solid #ddd', display: 'flex', 
      justifyContent: 'space-around', padding: '15px 0', zIndex: 1000 
    }}>
      <Link to="/settings" style={{ textDecoration: 'none', color: '#333' }}>⚙️ הגדרות</Link>
      <Link to="/stats" style={{ textDecoration: 'none', color: '#333' }}>📊 מדדים</Link>
      <Link to="/calendar" style={{ textDecoration: 'none', color: '#333' }}>📅 יומן</Link>
      <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>🏠 בית</Link>
    </nav>
  );
}