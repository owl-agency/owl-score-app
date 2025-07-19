// Fichier : netlify/functions/submit-form.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // On récupère les données envoyées par le formulaire du site
    const data = JSON.parse(event.body);

    // On récupère l'URL secrète du webhook depuis les variables d'environnement
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error('Webhook URL non configurée.');
    }

    // On transmet les données au webhook Google Sheets
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    return { statusCode: 200, body: JSON.stringify({ result: 'success' }) };

  } catch (error) {
    console.error("Erreur dans la fonction submit-form:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.toString() }) };
  }
};