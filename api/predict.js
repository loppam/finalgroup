export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Forward the request to your Flask backend
    const flaskResponse = await fetch('http://143.244.161.196:3001/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!flaskResponse.ok) {
      throw new Error(`Flask server responded with status: ${flaskResponse.status}`);
    }

    const data = await flaskResponse.json();
    
    // Return the response from Flask backend
    res.status(200).json(data);
  } catch (error) {
    console.error('Error proxying to Flask backend:', error);
    res.status(500).json({ 
      error: 'Failed to get prediction from backend',
      details: error.message 
    });
  }
} 