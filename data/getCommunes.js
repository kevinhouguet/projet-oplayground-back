async function getCommunes() {
  const url = 'https://geo.api.gouv.fr/communes';
  const httpResponse = await fetch(url);
  const data = await httpResponse.json();
  return data;
}

module.exports = getCommunes;
