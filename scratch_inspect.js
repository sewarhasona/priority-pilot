const supabaseUrl = 'https://tfyrtanuckeblxpkfnfb.supabase.co';
const supabaseAnonKey = 'sb_publishable_HbHB77Kp0cpc4wR2-7xFNA_OLK9tiZ6';

async function getCsvHeaders() {
  try {
    console.log('Requesting CSV headers from study_sessions...');
    const response = await fetch(`${supabaseUrl}/rest/v1/study_sessions?limit=1`, {
      headers: {
        'apikey': supabaseAnonKey,
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Accept': 'text/csv'
      }
    });

    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Headers:');
    response.headers.forEach((val, key) => {
      console.log(`  ${key}: ${val}`);
    });

    const csvText = await response.text();
    console.log(`CSV Text Length: ${csvText.length}`);
    console.log('CSV Text Content:', JSON.stringify(csvText));
  } catch (err) {
    console.error('Failed to fetch CSV headers:', err.message);
  }
}

getCsvHeaders();
