import { useState } from 'react';
import { useTasks } from '../context/TasksContext';

const DAYS_HE = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'];
const MONTHS_HE = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר',
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export default function CalendarPage() {
  const { theme, tasksByDay, setTasksByDay } = useTasks();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  const [newTask, setNewTask] = useState('');
  const [showInput, setShowInput] = useState(false);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const selectedKey = dateKey(viewYear, viewMonth, selectedDay);
  const selectedTasks = tasksByDay[selectedKey] || [];

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
    setSelectedDay(1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
    setSelectedDay(1);
  }

  function addTask() {
    const trimmed = newTask.trim();
    if (!trimmed) return;
    setTasksByDay(prev => ({
      ...prev,
      [selectedKey]: [...(prev[selectedKey] || []), { id: Date.now(), text: trimmed, done: false }],
    }));
    setNewTask('');
    setShowInput(false);
  }

  function toggleTask(id) {
    setTasksByDay(prev => ({
      ...prev,
      [selectedKey]: prev[selectedKey].map(t => t.id === id ? { ...t, done: !t.done } : t),
    }));
  }

  function deleteTask(id) {
    setTasksByDay(prev => ({
      ...prev,
      [selectedKey]: prev[selectedKey].filter(t => t.id !== id),
    }));
  }

  const isToday = (day) =>
    viewYear === today.getFullYear() &&
    viewMonth === today.getMonth() &&
    day === today.getDate();

  const hasTasksOn = (day) => {
    const key = dateKey(viewYear, viewMonth, day);
    return tasksByDay[key] && tasksByDay[key].length > 0;
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const selectedDateLabel = `${selectedDay} ב${MONTHS_HE[viewMonth]} ${viewYear}`;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto', background: theme.bgPage, minHeight: '100vh', color: theme.textPrimary }}>

      {/* כותרת ניווט חודש */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <button onClick={nextMonth} style={{ ...navBtnStyle, background: theme.bgCard, color: theme.textPrimary, border: `1px solid ${theme.border}` }}>›</button>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: theme.textPrimary }}>
          {MONTHS_HE[viewMonth]} {viewYear}
        </h2>
        <button onClick={prevMonth} style={{ ...navBtnStyle, background: theme.bgCard, color: theme.textPrimary, border: `1px solid ${theme.border}` }}>‹</button>
      </div>

      {/* ימי השבוע */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: '8px' }}>
        {DAYS_HE.map(d => (
          <div key={d} style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600', padding: '4px 0' }}>{d}</div>
        ))}
      </div>

      {/* ימי החודש */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '24px' }}>
        {cells.map((day, i) => (
          <div key={i} style={{ aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {day ? (
              <button
                onClick={() => setSelectedDay(day)}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%', border: 'none',
                  cursor: 'pointer', fontSize: '14px', fontWeight: isToday(day) || selectedDay === day ? '700' : '400',
                  background: isToday(day) && selectedDay === day
                    ? '#007bff'
                    : selectedDay === day
                    ? '#e8f0fe'
                    : isToday(day)
                    ? '#fff3cd'
                    : 'transparent',
                  color: isToday(day) && selectedDay === day ? 'white' : '#1e293b',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px',
                  position: 'relative',
                }}
              >
                {day}
                {hasTasksOn(day) && (
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: isToday(day) && selectedDay === day ? 'white' : '#007bff', position: 'absolute', bottom: '4px' }} />
                )}
              </button>
            ) : null}
          </div>
        ))}
      </div>

      {/* פאנל יום נבחר */}
      <div style={{ background: theme.bgCard, borderRadius: '16px', padding: '16px', border: `1px solid ${theme.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', color: theme.textPrimary }}>{selectedDateLabel}</h3>
          <span style={{ fontSize: '12px', color: theme.textMuted }}>
            {selectedTasks.length > 0 ? `${selectedTasks.filter(t => t.done).length}/${selectedTasks.length} הושלמו` : 'אין משימות'}
          </span>
        </div>

        {selectedTasks.length === 0 && !showInput && (
          <div style={{ textAlign: 'center', padding: '20px 0', color: theme.textMuted, fontSize: '14px' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>📅</div>
            אין משימות ליום זה
          </div>
        )}

        {selectedTasks.map(task => (
          <div key={task.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${theme.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} style={{ cursor: 'pointer' }} />
              <span style={{ fontSize: '14px', textDecoration: task.done ? 'line-through' : 'none', color: task.done ? theme.textMuted : theme.textPrimary }}>
                {task.text}
              </span>
            </div>
            <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '16px' }}>✕</button>
          </div>
        ))}

        {showInput && (
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <input
              autoFocus
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTask()}
              placeholder="שם המשימה..."
              style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: `1px solid ${theme.border}`, fontSize: '14px', background: theme.bgInput, color: theme.textPrimary }}
            />
            <button onClick={addTask} style={{ padding: '8px 14px', background: '#007bff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>הוסף</button>
            <button onClick={() => { setShowInput(false); setNewTask(''); }} style={{ padding: '8px 12px', border: `1px solid ${theme.border}`, borderRadius: '8px', cursor: 'pointer', background: theme.bgCard, color: theme.textPrimary }}>✕</button>
          </div>
        )}

        {!showInput && (
          <button
            onClick={() => setShowInput(true)}
            style={{ marginTop: '12px', width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}
          >
            + הוסף משימה ליום זה
          </button>
        )}
      </div>
    </div>
  );
}

const navBtnStyle = {
  background: '#f1f5f9', border: 'none', borderRadius: '8px',
  width: '36px', height: '36px', fontSize: '20px', cursor: 'pointer', color: '#475569',
};
