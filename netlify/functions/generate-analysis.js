const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const { prompt } = JSON.parse(event.body);
    const apiKey = process.env.GEMINI_API_KEY; // Récupère la clé depuis Netlify
    if (!apiKey) throw new Error('Clé API non configurée.');

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`Erreur API: ${response.statusText}`);
    const result = await response.json();
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.toString() }) };
  }
};