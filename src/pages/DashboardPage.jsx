export default function DashboardPage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', margin: '0' }}>לוח בקרה יומי</h1>
        <p style={{ color: '#666' }}>25 באפריל</p>
      </header>

      {/* מד אנרגיה */}
      <div style={{ background: '#fff', padding: '15px', borderRadius: '12px', border: '1px solid #eee' }}>
        <p>רמת אנרגיה: 75%</p>
        <div style={{ height: '10px', background: '#eee', borderRadius: '5px', overflow: 'hidden' }}>
          <div style={{ width: '75%', height: '100%', background: '#ff9800' }}></div>
        </div>
      </div>

      {/* רשימת משימות */}
      <section style={{ marginTop: '20px' }}>
        <h2 style={{ fontSize: '18px' }}>משימות להיום</h2>
        {['סריקת סילבוס', 'תרגול מתמטיקה', 'כתיבת דוח'].map((task, index) => (
          <div key={index} style={{ padding: '12px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <input type="checkbox" style={{ marginLeft: '10px' }} />
              <span>{task}</span>
            </div>
            {/* כאן הכפתורים של עריכה ומחיקה */}
            <div>
              <button style={{ fontSize: '12px', marginLeft: '5px' }}>ערוך</button>
              <button style={{ fontSize: '12px', color: 'red' }}>מחק</button>
            </div>
          </div>
        ))}
        <button style={{ marginTop: '15px', width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '8px' }}>
          + הוסף משימה
        </button>
      </section>
    </div>
  );
}