import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function TaskEditPage() {
  const [time, setTime] = useState('09:00');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!title.trim()) {
      alert('נא להזין שם למשימה');
      return;
    }

    // הוספת המשימה ל-Supabase במקום ל-localStorage
    const { error } = await supabase
      .from('tasks') // ודאי שיש לך טבלה בשם 'tasks' ב-Supabase
      .insert([{ title, time, done: false }]);

    if (error) {
      console.error('Error saving task:', error);
      alert('שגיאה בשמירת המשימה');
    } else {
      navigate('/'); // חזרה לדף הבית אחרי שמירה
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>הוספת משימה</h1>
      </header>

      <section className="task-list">
        <div className="setting-item" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '14px' }}>
          <label>
            שעה
            <input 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)}
              style={{ width:'100%', padding:'10px', marginTop:'6px', borderRadius:'8px', border:'1px solid #e2e8f0' }}
            />
          </label>
          <label>
            שם המשימה
            <input 
              type="text" 
              placeholder="לדוגמה: קריאת פרק בספר"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width:'100%', padding:'10px', marginTop:'6px', borderRadius:'8px', border:'1px solid #e2e8f0' }}
            />
          </label>
        </div>

        <button className="primary-btn" onClick={handleSave}>שמירה</button>
        <button 
          className="primary-btn" 
          style={{ backgroundColor:'#94a3b8', marginTop:'10px' }}
          onClick={() => navigate('/')}
        >
          ביטול
        </button>
      </section>
    </div>
  );
}