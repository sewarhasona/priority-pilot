import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import './StudySessionsList.css';

export default function StudySessionsList() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States לניהול מצב העריכה
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editSubject, setEditSubject] = useState('');

  // 1. פונקציה למשיכת המפגשים מ-Supabase
  async function fetchSessions() {
    try {
      setLoading(true);
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('study_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setSessions(data || []);
    } catch (err) {
      console.error('Error fetching study sessions:', err);
      setError(err.message || 'חלה טעות בטעינת מפגשי הלמידה');
    } finally {
      setLoading(false);
    }
  }

  // טעינה ראשונית של המידע שהרכיב עולה
  useEffect(() => {
    fetchSessions();
  }, []);

  // 2. פונקציה למחיקת מפגש (Delete)
  const handleDeleteSession = async (sessionId) => {
    const confirmDelete = window.confirm("האם את בטוחה שברצונך למחוק את מפגש הלימוד הזה?");
    if (!confirmDelete) return;

    try {
      const { error: deleteError } = await supabase
        .from('study_sessions')
        .delete()
        .eq('id', sessionId);

      if (deleteError) throw deleteError;

      // רענון אוטומטי של הרשימה
      fetchSessions();
    } catch (err) {
      alert("שגיאה במחיקת המפגש: " + err.message);
    }
  };

  // 3. פונקציה שמפעילה את מצב העריכה עבור שורה ספציפית
  const startEditing = (session) => {
    setEditingSessionId(session.id);
    setEditSubject(session.subject); // מילוי הטקסט הקיים בתיבה
  };

  // 4. פונקציה לשמירת העדכון ב-Supabase (Update)
  const handleUpdateSession = async (sessionId) => {
    if (!editSubject.trim()) {
      alert("נא להזין נושא למפגש");
      return;
    }

    try {
      const { error: updateError } = await supabase
        .from('study_sessions')
        .update({ subject: editSubject })
        .eq('id', sessionId);

      if (updateError) throw updateError;

      // איפוס מצב העריכה ורענון הנתונים
      setEditingSessionId(null);
      fetchSessions();
    } catch (err) {
      alert("שגיאה בעדכון המפגש: " + err.message);
    }
  };

// מצבי טעינה ושגיאה במסך (מעודכן לפי ה-CSS שלך!)
  if (loading) return (
    <div className="sessions-loading">
      <div className="spinner"></div>
      <p>טוען מפגשים...</p>
    </div>
  );

  if (error) return (
    <div className="sessions-error">
      <span className="error-icon">⚠️</span>
      <span>{error}</span>
    </div>
  );

  return (
    <div className="sessions-container">
      <h2>מפגשי הלימוד שלי</h2>

      {sessions.length === 0 ? (
        <p>אין מפגשים זמינים. הגיע הזמן ליצור אחד!</p>
      ) : (
        <ul className="sessions-list">
          {sessions.map((session) => (
            <li key={session.id} className="session-item">

              {/* החלק שמשתנה: אם אנחנו במצב עריכה של המפגש הנוכחי */}
              {editingSessionId === session.id ? (
                <div className="edit-mode-container">
                  <input
                    type="text"
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value)}
                    className="edit-input"
                  />
                  <button onClick={() => handleUpdateSession(session.id)} className="save-btn">
                    💾 שמור
                  </button>
                  <button onClick={() => setEditingSessionId(null)} className="cancel-btn">
                    ❌ ביטול
                  </button>
                </div>
              ) : (
                // מצב תצוגה רגיל
                <div className="view-mode-container">
                  <span className="session-subject">{session.subject}</span>

                  <div className="session-actions">
                    <button onClick={() => startEditing(session)} className="edit-btn">
                      ✏️ ערוך
                    </button>
                    <button onClick={() => handleDeleteSession(session.id)} className="delete-btn">
                      🗑️ מחק
                    </button>
                  </div>
                </div>
              )}

            </li>
          ))}
        </ul>
      )}
    </div>
  );
}