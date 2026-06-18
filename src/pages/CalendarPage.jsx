import React, { useState, useEffect } from 'react';

export default function CalendarPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // טעינת משימות מ-localStorage
    const stored = localStorage.getItem('pp_tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  return (
    <div className="app-container">
      <header>
        <h1>יומן</h1>
      </header>

      {/* כאן תוכלי להוסיף את הלוגיקה של הלוח שנה */}
      
      <section className="task-list">
        <h3>משימות להיום</h3>
        {tasks.length === 0 ? (
          <p style={{ color: '#64748b', padding: '10px 0' }}>אין משימות מתוזמנות.</p>
        ) : (
          tasks.sort((a, b) => a.time.localeCompare(b.time)).map((task, index) => (
            <div key={index} className="task-item">
              <input type="checkbox" checked={task.done} readOnly />
              <span>{task.time} - {task.title}</span>
            </div>
          ))
        )}
      </section>
    </div>
  );
}