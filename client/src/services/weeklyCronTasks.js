import http from './httpService'
import { apiUrl } from '../config.json'
import { yahooDataPull } from './yahooFinance'
import testsData from '../model/testSector.json'
import $ from 'jquery'
var CronJob = require('cron').CronJob;

export function updateSectorData() {

  // cron job runs every Friday at 16:05
  const job = new CronJob('05 16 * * 5', function() {
    console.log("CRON JOB UPDATING SECTOR DATA")
    const apiKey = 'EG1B4JUOHK5U6LNR'
    let counter = 0
    let thisStockData = {
      name: testsData[counter].Company,
      symbol: testsData[counter].Stock,
      topHoldingsNames: [],
      topHoldingsPcts: [],
      priceData: [],
      adxData: [],
      macdData: []
    }

  //kick off
  const getAdxData = () => {
    $.ajax({
      /* The whisperingforest.org URL is not longer valid, I found a new one that is similar... */
      url: `https://www.alphavantage.co/query?function=ADX&symbol=${testsData[counter].Stock}&interval=weekly&time_period=10&apikey=${apiKey}`,
      async: true,
      dataType: 'json',
      success: function(res) {
        Object.entries(res['Technical Analysis: ADX']).forEach(
          ([key, value], index) => {
            thisStockData.adxData.push(Number(value['ADX']))
          }
        )
        getTopHoldings()
      }
    })
  }

  const getTopHoldings = () => {
    console.log("Yahoo data...")
    yahooDataPull(thisStockData.symbol).then((yahooData) => {
      for (let i = 0; i < 10; i++){
        !yahooData.data.defaultKeyStatistics.err ? thisStockData.topHoldingsNames.push(yahooData.data.topHoldings.holdings[i].symbol) : thisStockData.topHoldingsNames.push("")
        !yahooData.data.defaultKeyStatistics.err ? thisStockData.topHoldingsPcts.push(yahooData.data.topHoldings.holdings[i].holdingPercent.raw) : thisStockData.topHoldingsPcts.push("")
      }
    }).then(()=> {
      getMacdData()
    })
  }

  const getMacdData = () => {
    $.ajax({
      /* The whisperingforest.org URL is not longer valid, I found a new one that is similar... */
      url: `https://www.alphavantage.co/query?function=MACD&symbol=${testsData[counter].Stock}&interval=weekly&series_type=close&apikey=${apiKey}`,
      async: true,
      dataType: 'json',
      success: function(res) {
        Object.entries(res['Technical Analysis: MACD']).forEach(
          ([key, value], index) => {
            thisStockData.macdData.push(Number(value['MACD']))
          }
        )
        
        console.log("PASSING WASHED SECTOR TO Update sectors API")
        console.log(thisStockData)

        let apiEndpoint = apiUrl + '/updateSectors'
        http.put(apiEndpoint, thisStockData)
        counter++
        
        if (counter < testsData.length) {
          getPriceData()
          thisStockData = {
            name: testsData[counter].Company,
            symbol: testsData[counter].Stock,
            priceData: [],
            adxData: [],
            macdData: [],
            topHoldingsNames: [],
            topHoldingsPcts: []
          }
        }
      }
    })
  }

  const getPriceData = () => {
    //price data first
    $.ajax({
      url: `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${testsData[counter].Stock}&apikey=${apiKey}`,
      async: true,
      dataType: 'json',
      success: function(res) {
        Object.entries(res['Weekly Time Series']).forEach(
          ([key, value], index) => {
            thisStockData.priceData.push(Number(value['4. close']))
          }
        )
        getAdxData()
      }
    })
  }

  getPriceData()

  });
  job.start();
}

export async function updateAllStocks() {

    try {
        let apiEndpoint = apiUrl + '/pullAllStocks'
        var allStocks = await http.get(apiEndpoint)
    } catch {
        return []
    }

    let stocksToUpdate = []

    for (let i = 0; i < allStocks.data.length; i++){
        stocksToUpdate.push(allStocks.data[i].stockName)
    }
    console.log(stocksToUpdate)

    // cron job runs every Friday at 16:05
    const job = new CronJob('05 16 * * 5', function() {

    console.log("CRON JOB UPDATING STOCK DATA")

    const apiKey = 'EG1B4JUOHK5U6LNR'
    let counter = 0
    let thisStockData = {
        livePrice: 0,
        stockName: stocksToUpdate[counter].toUpperCase(),
        priceData: [],
        adxData: [],
        macdData: [],
        averageVolumeTenDays: 0,
        fundamentalData: {
            marketCap: 0,
            sector: "",
            floatingShares: 0,
            sharesShort: 0,
            insidersPctHeld: 0,
            nextEarningsDate: "",
            grossMargins: 0,
            profitMargins: 0
        }
    }
  
    //kick off
    const getAdxData = () => {
        $.ajax({
            /* The whisperingforest.org URL is not longer valid, I found a new one that is similar... */
            url: `https://www.alphavantage.co/query?function=ADX&symbol=${stocksToUpdate[counter]}&interval=weekly&time_period=10&apikey=${apiKey}`,
            async: true,
            dataType: 'json',
            success: function (res) {
                console.log(`ADX: ${stocksToUpdate[counter]}`)
                // console.log(res)
                Object.entries(res['Technical Analysis: ADX']).forEach(
                    ([key, value], index) => {
                        thisStockData.adxData.push(Number(value['ADX']))
                    }
                )
                getFundamentalData()
            }
        })
    }

    const getFundamentalData = () => {
        yahooDataPull(stocksToUpdate[counter]).then((yahooData) => {
            console.log(yahooData)

        if(!yahooData.data.summaryDetail) {
            console.log("TEST")
            let sectorTicker = Object.keys(yahooData.data.quoteData)[0]
            thisStockData.averageVolumeTenDays = yahooData.data.quoteData[sectorTicker].regularMarketVolume.raw
            thisStockData.livePrice = yahooData.data.quoteData[sectorTicker].regularMarketPrice.raw
        }

        if (yahooData.data.summaryDetail && yahooData.data.summaryProfile) {
            //technical data
            thisStockData.averageVolumeTenDays = yahooData.data.summaryDetail.averageVolume10days.raw
            thisStockData.livePrice = yahooData.data.summaryDetail.ask.raw

            // fundamental data
            thisStockData.fundamentalData.marketCap = yahooData.data.summaryDetail.marketCap.fmt
            thisStockData.fundamentalData.sector = yahooData.data.summaryProfile.sector
            thisStockData.fundamentalData.floatingShares = yahooData.data.defaultKeyStatistics.floatShares.raw
            thisStockData.fundamentalData.sharesShort = yahooData.data.defaultKeyStatistics.sharesShort.raw
            thisStockData.fundamentalData.insidersPctHeld = yahooData.data.defaultKeyStatistics.heldPercentInsiders.raw
            thisStockData.fundamentalData.nextEarningsDate = yahooData.data.calendarEvents.earnings.earningsDate[0].raw
            thisStockData.fundamentalData.grossMargins = yahooData.data.financialData.grossMargins.raw
            thisStockData.fundamentalData.profitMargins = yahooData.data.financialData.profitMargins.raw
        }

        }).then(() => {
            getMacdData()
        })

    }

    const getMacdData = () => {
        $.ajax({
            /* The whisperingforest.org URL is not longer valid, I found a new one that is similar... */
            url: `https://www.alphavantage.co/query?function=MACD&symbol=${stocksToUpdate[counter]}&interval=weekly&series_type=close&apikey=${apiKey}`,
            async: true,
            dataType: 'json',
            success: function (res) {
                console.log(`MACD: ${stocksToUpdate[counter]}`)
                // console.log(res)
                Object.entries(res['Technical Analysis: MACD']).forEach(
                    ([key, value], index) => {
                        thisStockData.macdData.push(Number(value['MACD']))
                    }
                )
                console.log("PASSING WASHED STOCK TO Update STOCK API")
                console.log(thisStockData)
                let apiEndpoint = apiUrl + '/updateStock';
                http.put(apiEndpoint, thisStockData)
                counter++
                console.log(counter) 

                if (counter < allStocks.length) {
                    getPriceData()
                    thisStockData = {
                        livePrice: 0,
                        stockName: stocksToUpdate[counter].toUpperCase(),
                        priceData: [],
                        adxData: [],
                        macdData: [],
                        averageVolumeTenDays: 0,
                        fundamentalData: {
                            marketCap: 0,
                            sector: "",
                            floatingShares: 0,
                            sharesShort: 0,
                            insidersPctHeld: 0,
                            nextEarningsDate: "",
                            grossMargins: 0,
                            profitMargins: 0
                        }
                    }
                  }
            }
        })
    }

    const getPriceData = () => {
        //price data first
        $.ajax({
            /* The whisperingforest.org URL is not longer valid, I found a new one that is similar... */
            url: `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${stocksToUpdate[counter]}&apikey=${apiKey}`,
            async: true,
            dataType: 'json',
            success: function (res) {
                console.log(`PRICE: ${stocksToUpdate[counter]}`)
                Object.entries(res['Weekly Time Series']).forEach(
                    ([key, value], index) => {
                        thisStockData.priceData.push(Number(value['4. close']))
                    }
                )
                getAdxData()
            },
        })
    }
    getPriceData();

    });
    job.start();
  }
  
updateAllStocks()
updateSectorData()