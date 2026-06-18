import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function SettingsPage() {
  const [notif, setNotif] = useState(true);

  return (
    <div className="app-container">
      <header><h1>הגדרות</h1></header>
      <p className="page-subtitle">התאמה אישית של האפליקציה</p>

      <div className="setting-item">
        <div className="setting-info">
          <span>🔔</span><span>התראות יומיות</span>
        </div>
        <label className="switch">
          <input type="checkbox" checked={notif} onChange={() => setNotif(!notif)} />
          <span className="slider"></span>
        </label>
      </div>

      <div className="setting-item">
        <div className="setting-info">
          <span>🌙</span><span>מצב כהה</span>
        </div>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
      </div>

      <button className="danger-btn" onClick={() => supabase.auth.signOut()}>התנתק מהמערכת</button>
    </div>
  );
}