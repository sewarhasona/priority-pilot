import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { useTasks } from '../context/TasksContext';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { setTasks, darkMode, setDarkMode, theme } = useTasks();

  const [notif, setNotif] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [userName, setUserName] = useState('משתמש');
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');

  async function handleLogout() {
    await supabase.auth.signOut();
    setShowLogoutConfirm(false);
    navigate('/');
  }

  function handleClearTasks() {
    setTasks([]);
    setShowClearConfirm(false);
  }

  function saveName() {
    const trimmed = nameInput.trim();
    if (trimmed) setUserName(trimmed);
    setEditingName(false);
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto', background: theme.bgPage, minHeight: '100vh', color: theme.textPrimary }}>
      <h1 style={{ fontSize: '24px', marginBottom: '4px' }}>הגדרות</h1>
      <p style={{ color: '#94a3b8', marginBottom: '24px', marginTop: 0 }}>התאמה אישית של האפליקציה</p>

      {/* פרופיל */}
      <Section title="פרופיל" theme={theme}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#e8f0fe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>
            👤
          </div>
          <div style={{ flex: 1 }}>
            {editingName ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  autoFocus
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveName()}
                  style={{ flex: 1, padding: '6px 10px', borderRadius: '8px', border: `1px solid ${theme.border}`, fontSize: '14px', background: theme.bgInput, color: theme.textPrimary }}
                />
                <button onClick={saveName} style={smallBtnStyle('#007bff')}>שמור</button>
                <button onClick={() => setEditingName(false)} style={smallBtnStyle('#94a3b8')}>ביטול</button>
              </div>
            ) : (
              <>
                <div style={{ fontWeight: '600', fontSize: '16px', color: theme.textPrimary }}>{userName}</div>
                <button
                  onClick={() => { setNameInput(userName); setEditingName(true); }}
                  style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontSize: '13px', padding: 0, marginTop: '2px' }}
                >
                  ערוך שם
                </button>
              </>
            )}
          </div>
        </div>
      </Section>

      {/* העדפות */}
      <Section title="העדפות" theme={theme}>
        <SettingRow icon="🔔" label="התראות יומיות" theme={theme}>
          <Toggle checked={notif} onChange={() => setNotif(v => !v)} />
        </SettingRow>
        <SettingRow icon="🌙" label="מצב כהה" theme={theme}>
          <Toggle checked={darkMode} onChange={() => setDarkMode(v => !v)} />
        </SettingRow>
        <SettingRow icon="🌐" label="שפה" theme={theme}>
          <span style={{ fontSize: '14px', color: theme.textSecondary }}>עברית</span>
        </SettingRow>
      </Section>

      {/* ניהול נתונים */}
      <Section title="ניהול נתונים" theme={theme}>
        <SettingRow icon="🗑️" label="נקה את כל המשימות" sublabel="פעולה בלתי הפיכה" theme={theme}>
          <button onClick={() => setShowClearConfirm(true)} style={outlineBtnStyle('#ef4444')}>נקה</button>
        </SettingRow>
        <SettingRow icon="📤" label="ייצוא נתונים" theme={theme}>
          <button onClick={exportData} style={outlineBtnStyle('#007bff')}>ייצא</button>
        </SettingRow>
      </Section>

      {/* אודות */}
      <Section title="אודות" theme={theme}>
        <SettingRow icon="📱" label="גרסת אפליקציה" theme={theme}>
          <span style={{ fontSize: '14px', color: theme.textMuted }}>1.0.0</span>
        </SettingRow>
        <SettingRow icon="✉️" label="צור קשר" theme={theme}>
          <span style={{ fontSize: '14px', color: theme.textMuted }}>support@prioritypilot.app</span>
        </SettingRow>
      </Section>

      {/* התנתקות */}
      <button
        onClick={() => setShowLogoutConfirm(true)}
        style={{ marginTop: '8px', width: '100%', padding: '14px', background: theme.bgPage, color: '#ef4444', border: '1.5px solid #ef4444', borderRadius: '12px', cursor: 'pointer', fontSize: '15px', fontWeight: '600' }}
      >
        התנתק מהמערכת
      </button>

      {/* דיאלוג אישור התנתקות */}
      {showLogoutConfirm && (
        <ConfirmDialog
          message="האם אתה בטוח שברצונך להתנתק?"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutConfirm(false)}
          confirmLabel="התנתק"
          danger
          theme={theme}
        />
      )}

      {showClearConfirm && (
        <ConfirmDialog
          message="האם אתה בטוח? כל המשימות יימחקו לצמיתות."
          onConfirm={handleClearTasks}
          onCancel={() => setShowClearConfirm(false)}
          confirmLabel="נקה הכל"
          danger
          theme={theme}
        />
      )}
    </div>
  );
}

function exportData() {
  const tasks = JSON.parse(localStorage.getItem('pp_tasks') || '[]');
  const blob = new Blob([JSON.stringify(tasks, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'priority_pilot_tasks.json';
  a.click();
  URL.revokeObjectURL(url);
}

function Section({ title, children, theme }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ fontSize: '12px', fontWeight: '700', color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
        {title}
      </div>
      <div style={{ background: theme.bgCard, borderRadius: '12px', border: `1px solid ${theme.border}`, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

function SettingRow({ icon, label, sublabel, children, theme }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${theme.borderLight}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '18px' }}>{icon}</span>
        <div>
          <div style={{ fontSize: '14px', fontWeight: '500', color: theme.textPrimary }}>{label}</div>
          {sublabel && <div style={{ fontSize: '11px', color: theme.textMuted }}>{sublabel}</div>}
        </div>
      </div>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange, disabled }) {
  return (
    <div
      onClick={!disabled ? onChange : undefined}
      style={{
        width: '44px', height: '24px', borderRadius: '12px', cursor: disabled ? 'not-allowed' : 'pointer',
        background: checked && !disabled ? '#007bff' : '#cbd5e1',
        position: 'relative', transition: 'background 0.2s', opacity: disabled ? 0.5 : 1,
      }}
    >
      <div style={{
        position: 'absolute', top: '3px', width: '18px', height: '18px', borderRadius: '50%',
        background: 'white', transition: 'right 0.2s',
        right: checked ? '3px' : '23px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </div>
  );
}

function ConfirmDialog({ message, onConfirm, onCancel, confirmLabel, danger, theme }) {
  const bg = theme ? theme.bgCard : 'white';
  const textColor = theme ? theme.textPrimary : '#1e293b';
  const borderColor = theme ? theme.border : '#e2e8f0';
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
      <div style={{ background: bg, borderRadius: '16px', padding: '24px', maxWidth: '320px', width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚠️</div>
        <p style={{ margin: '0 0 20px', fontSize: '15px', color: textColor, lineHeight: '1.5' }}>{message}</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={onCancel} style={{ flex: 1, padding: '10px', border: `1px solid ${borderColor}`, borderRadius: '10px', cursor: 'pointer', background: bg, color: textColor, fontSize: '14px' }}>ביטול</button>
          <button onClick={onConfirm} style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '10px', cursor: 'pointer', background: danger ? '#ef4444' : '#007bff', color: 'white', fontSize: '14px', fontWeight: '600' }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

function smallBtnStyle(color) {
  return { padding: '5px 12px', background: color, color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px' };
}

function outlineBtnStyle(color) {
  return { padding: '6px 14px', background: 'white', color, border: `1.5px solid ${color}`, borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' };
}
