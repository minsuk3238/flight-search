import axios from 'axios';

async function main() {
  const url = 'https://techminds.pstatic.net/flight/statics/vertical/0128a824152efed83eff54237abd3dc4e4514297/_next/static/chunks/pages/flights/international/%5B...routes%5D-00874b119e7a285f.js';
  const res = await axios.get(url);
  const text = res.data;

  // Search for url strings, endpoints, graphql, or fetch calls
  const matches = text.match(/https?:\/\/[^\'\"\`\)\s\}]+/g);
  console.log('URLs in routes chunk:', Array.from(new Set(matches || [])));

  // Search for paths like /api or /v2 or /schedules
  const pathMatches = text.match(/\"\/[a-zA-Z0-9_\-\/]+\"/g);
  console.log('Paths:', Array.from(new Set(pathMatches || [])).slice(0, 30));
}

main();
