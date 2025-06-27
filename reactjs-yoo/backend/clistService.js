const axios = require('axios');

const getUpcomingContests = async () => {
  const username = process.env.CLIST_API_USERNAME;
  const apiKey = process.env.CLIST_API_KEY;
  const now = new Date().toISOString();
  
  const url = `https://clist.by/api/v2/contest/?start__gt=${now}&format=json&order_by=start`;

  const headers = {
    Authorization: `ApiKey ${username}:${apiKey}`
  };

  const response = await axios.get(url, { headers });
  return response.data;
};

module.exports = { getUpcomingContests };
