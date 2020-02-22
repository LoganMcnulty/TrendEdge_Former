const axios = require('axios')

export async function yahooDataPull(stockTicker) {
  const yahooData = await axios({
    "method":"GET",
    "url":"https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-detail",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"apidojo-yahoo-finance-v1.p.rapidapi.com",
    "x-rapidapi-key":"31d1e22625msh0d27ce9220d6290p13cfdfjsn3e5237afdbdf"
    },"params":{
    "region":"US",
    "symbol": `${stockTicker}`
    }
    })
  return yahooData
}
