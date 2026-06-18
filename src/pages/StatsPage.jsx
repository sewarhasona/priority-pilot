import { useTasks } from '../context/TasksContext';

export default function StatsPage() {
  const { tasks } = useTasks();

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

      <section style={{ marginTop: '24px' }}>
        <h3>רשימת המשימות</h3>
        {tasks.length === 0 ? (
          <p style={{ color: '#94a3b8', marginTop: '10px' }}>אין משימות עדיין.</p>
        ) : (
          tasks.map(task => (
            <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: '1px solid #eee' }}>
              <span style={{ fontSize: '16px' }}>{task.done ? '✅' : '⏳'}</span>
              <span style={{ textDecoration: task.done ? 'line-through' : 'none', color: task.done ? '#94a3b8' : '#1e293b', fontSize: '14px' }}>
                {task.text}
              </span>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
