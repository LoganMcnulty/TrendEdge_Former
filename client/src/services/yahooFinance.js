const axios = require('axios')

export async function yahooDataPull(stockTicker) {
  const yahooData = await axios({
    method: 'GET',
    url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary',
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': process.env.REACT_APP_YAHOO_FINANCE_HOST,
      'x-rapidapi-key': process.env.REACT_APP_YAHOO_FINANCE_API_KEY,
    },
    params: {
      region: 'US',
      symbol: `${stockTicker}`,
    },
  })
    .then(response => {
      return response
    })
    .catch(error => {
      console.log(error)
    })
  return yahooData
}
