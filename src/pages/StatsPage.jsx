import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function StatsPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // כאן בעתיד תוכלי לשלוף נתונים אמיתיים מ-Supabase
    // בינתיים השארתי את הלוגיקה של ה-localStorage כפי שהייתה לך
    const stored = localStorage.getItem('pp_tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const pending = total - done;
  const rate = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="app-container">
      <header>
        <h1>המדדים שלי</h1>
      </header>
      <p className="page-subtitle">סיכום ההתקדמות שלך עד כה</p>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-value">{total}</div>
          <div className="stat-label">סה"כ משימות</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{done}</div>
          <div className="stat-label">משימות שהושלמו</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-value">{rate}%</div>
          <div className="stat-label">אחוז השלמה</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-value">{pending}</div>
          <div className="stat-label">משימות בהמתנה</div>
        </div>
      </div>

      <section className="task-list" style={{ marginTop: '25px' }}>
        <h3>התקדמות כללית</h3>
        <div className="energy-bar-bg" style={{ marginTop: '12px' }}>
          <div className="energy-bar-fill" style={{ width: `${rate}%` }}></div>
        </div>
      </section>
    </div>
  );
}