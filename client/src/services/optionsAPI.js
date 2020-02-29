const axios = require("axios");

export async function yahooOptionsPull (stockTicker) {
  const yahooOptions = await axios({
    "method":"GET",
    "url":"https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-options",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"apidojo-yahoo-finance-v1.p.rapidapi.com",
    "x-rapidapi-key":"31d1e22625msh0d27ce9220d6290p13cfdfjsn3e5237afdbdf"
    },"params":{
    "symbol":`${stockTicker}`,
    "date":"1562284800"
    }
    })
    .then((response)=>{
        console.log(response)
        return(response)})
    .catch((error)=>{console.log(error)})
    return (yahooOptions)
}