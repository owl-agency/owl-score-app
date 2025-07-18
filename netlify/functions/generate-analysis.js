// Fichier : netlify/functions/generate-analysis.js
// VERSION DE DÉBOGAGE - Ne fonctionne pas pour l'IA, mais sert à tester la détection.

exports.handler = async function(event, context) {
  // Cette fonction renvoie simplement un message de succès.
  // Elle n'a aucune dépendance externe comme 'node-fetch'.
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: "La fonction a été détectée avec succès !" }),
  };
};