import { useState } from 'react';
import { useTasks } from '../context/TasksContext';

const DAYS_HE = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
const MONTHS_HE = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];

function getTodayLabel() {
  const now = new Date();
  const day = DAYS_HE[now.getDay()];
  const date = now.getDate();
  const month = MONTHS_HE[now.getMonth()];
  const year = now.getFullYear();
  return `יום ${day}, ${date} ב${month} ${year}`;
}

export default function DashboardPage() {
  const { tasks, setTasks, tasksByDay, setTasksByDay, theme } = useTasks();
  const [newTask, setNewTask] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const done = tasks.filter(t => t.done).length;
  const total = tasks.length;

  function addTask() {
    const trimmed = newTask.trim();
    if (!trimmed) return;
    if (newTaskDate) {
      setTasksByDay(prev => ({
        ...prev,
        [newTaskDate]: [...(prev[newTaskDate] || []), { id: Date.now(), text: trimmed, done: false }],
      }));
    } else {
      setTasks(prev => [...prev, { id: Date.now(), text: trimmed, done: false }]);
    }
    setNewTask('');
    setNewTaskDate('');
    setShowInput(false);
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  function toggleDone(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  function startEdit(task) {
    setEditingId(task.id);
    setEditText(task.text);
  }

  function saveEdit(id) {
    const trimmed = editText.trim();
    if (!trimmed) return;
    setTasks(prev => prev.map(t => t.id === id ? { ...t, text: trimmed } : t));
    setEditingId(null);
    setEditText('');
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', background: theme.bgPage, minHeight: '100vh', color: theme.textPrimary, direction: 'rtl' }}>

      {/* כותרת ממורכזת */}
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', margin: '0 0 6px', color: theme.textPrimary, fontWeight: '700' }}>לוח בקרה יומי</h1>
        <p style={{ color: theme.textSecondary, margin: 0, fontSize: '14px' }}>{getTodayLabel()}</p>
      </header>

      {/* מד אנרגיה */}
      <div style={{ background: theme.bgCard, padding: '16px', borderRadius: '14px', border: `1px solid ${theme.border}`, marginBottom: '20px' }}>
        <p style={{ color: theme.textPrimary, margin: '0 0 10px', fontWeight: '600' }}>רמת אנרגיה: 75%</p>
        <div style={{ height: '10px', background: theme.border, borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ width: '75%', height: '100%', background: '#ff9800', borderRadius: '5px' }}></div>
        </div>
      </div>

      {/* כותרת משימות עם מונה */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h2 style={{ fontSize: '18px', margin: 0, color: theme.textPrimary, fontWeight: '700' }}>משימות להיום</h2>
        {total > 0 && (
          <span style={{ fontSize: '13px', color: theme.textMuted, background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: '20px', padding: '2px 10px' }}>
            {done}/{total} הושלמו
          </span>
        )}
      </div>

      {/* רשימת משימות */}
      <div style={{ background: theme.bgCard, borderRadius: '14px', border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
        {tasks.length === 0 && (
          <div style={{ padding: '30px', textAlign: 'center', color: theme.textMuted, fontSize: '14px' }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>📋</div>
            אין משימות להיום
          </div>
        )}

        {tasks.map((task, index) => (
          <div
            key={task.id}
            style={{
              padding: '14px 16px',
              borderBottom: index < tasks.length - 1 ? `1px solid ${theme.borderLight}` : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            {editingId === task.id ? (
              <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
                <input
                  autoFocus
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveEdit(task.id)}
                  style={{ flex: 1, padding: '6px 10px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.bgInput, color: theme.textPrimary, fontSize: '14px' }}
                />
                <button onClick={() => saveEdit(task.id)} style={{ fontSize: '12px', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer' }}>שמור</button>
                <button onClick={() => setEditingId(null)} style={{ fontSize: '12px', cursor: 'pointer', background: 'none', color: theme.textMuted, border: `1px solid ${theme.border}`, borderRadius: '8px', padding: '6px 10px' }}>ביטול</button>
              </div>
            ) : (
              <>
                {/* צד ימין — צ'קבוקס + טקסט */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => toggleDone(task.id)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#007bff', flexShrink: 0 }}
                  />
                  <span style={{
                    fontSize: '15px',
                    textDecoration: task.done ? 'line-through' : 'none',
                    color: task.done ? theme.textMuted : theme.textPrimary,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {task.text}
                  </span>
                </div>

                {/* כפתורי פעולה */}
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  <button
                    onClick={() => startEdit(task)}
                    style={{ fontSize: '12px', cursor: 'pointer', background: 'none', color: '#007bff', border: `1px solid #007bff`, borderRadius: '8px', padding: '4px 10px', fontWeight: '500' }}
                  >
                    ערוך
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    style={{ fontSize: '12px', color: '#ef4444', cursor: 'pointer', background: 'none', border: `1px solid #ef4444`, borderRadius: '8px', padding: '4px 10px', fontWeight: '500' }}
                  >
                    מחק
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* שדה הוספה */}
      {showInput && (
        <div style={{ marginTop: '12px', background: theme.bgCard, border: `1px solid ${theme.border}`, borderRadius: '14px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            autoFocus
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
            placeholder="שם המשימה..."
            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: `1px solid ${theme.border}`, fontSize: '15px', background: theme.bgInput, color: theme.textPrimary, boxSizing: 'border-box' }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>📅</span>
            <span style={{ fontSize: '13px', color: theme.textSecondary, flexShrink: 0 }}>שמור ביומן:</span>
            <input
              type="date"
              value={newTaskDate}
              onChange={e => setNewTaskDate(e.target.value)}
              style={{ flex: 1, padding: '6px 10px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.bgInput, color: theme.textPrimary, fontSize: '13px' }}
            />
            {newTaskDate && (
              <button onClick={() => setNewTaskDate('')} style={{ background: 'none', border: 'none', color: theme.textMuted, cursor: 'pointer', fontSize: '16px', padding: '0 4px' }}>✕</button>
            )}
          </div>
          {newTaskDate && (
            <p style={{ margin: 0, fontSize: '12px', color: '#007bff' }}>
              המשימה תישמר ביומן ולא ברשימת היום
            </p>
          )}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={addTask} style={{ flex: 1, padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', fontSize: '15px' }}>
              {newTaskDate ? '+ הוסף ליומן' : '+ הוסף'}
            </button>
            <button onClick={() => { setShowInput(false); setNewTask(''); setNewTaskDate(''); }} style={{ padding: '10px 14px', border: `1px solid ${theme.border}`, borderRadius: '10px', cursor: 'pointer', background: 'none', color: theme.textPrimary }}>ביטול</button>
          </div>
        </div>
      )}

      {!showInput && (
        <button
          onClick={() => setShowInput(true)}
          style={{ marginTop: '14px', width: '100%', padding: '12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '16px', fontWeight: '600' }}
        >
          + הוסף משימה
        </button>
      )}
    </div>
  );
}
