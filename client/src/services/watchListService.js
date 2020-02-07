import http from './httpService'
import { apiUrl } from '../config.json'
import $ from 'jquery'
import { getSettings } from '../services/userService'
import { yahooDataPull } from './yahooFinance'

export function pullStockData(email, stockTicker) {
  const apiKey = '07S5MN2IBXDCQAGB'
  let thisStockData = {
    livePrice: 0,
    stockName: stockTicker.toUpperCase(),
    priceData: [],
    adxData: [],
    macdData: [],
    averageVolumeTenDays: 0,
    fundamentalData: {
      marketCap: 0,
      sector: '',
      floatingShares: 0,
      sharesShort: 0,
      insidersPctHeld: 0,
      nextEarningsDate: '',
      grossMargins: 0,
      profitMargins: 0,
    },
  }

  //kick off
  const getAdxData = () => {
    $.ajax({
      /* The whisperingforest.org URL is not longer valid, I found a new one that is similar... */
      url: `https://www.alphavantage.co/query?function=ADX&symbol=${stockTicker}&interval=weekly&time_period=10&apikey=${apiKey}`,
      async: true,
      dataType: 'json',
      success: function(res) {
        console.log('ADX:')
        // console.log(res)
        Object.entries(res['Technical Analysis: ADX']).forEach(
          ([key, value], index) => {
            thisStockData.adxData.push(Number(value['ADX']))
          }
        )
        getFundamentalData()
      },
    })
  }

  const getFundamentalData = () => {
    console.log('Yahoo data...')
    yahooDataPull(stockTicker)
      .then(yahooData => {
        console.log(yahooData)

        //technical data
        thisStockData.averageVolumeTenDays =
          yahooData.data.summaryDetail.averageVolume10days.raw
        thisStockData.livePrice = yahooData.data.summaryDetail.ask.raw

        // fundamental data
        thisStockData.fundamentalData.marketCap =
          yahooData.data.summaryDetail.marketCap.fmt
        thisStockData.fundamentalData.sector =
          yahooData.data.summaryProfile.sector
        thisStockData.fundamentalData.floatingShares =
          yahooData.data.defaultKeyStatistics.floatShares.raw
        thisStockData.fundamentalData.sharesShort =
          yahooData.data.defaultKeyStatistics.sharesShort.raw
        thisStockData.fundamentalData.insidersPctHeld =
          yahooData.data.defaultKeyStatistics.heldPercentInsiders.raw
        thisStockData.fundamentalData.nextEarningsDate =
          yahooData.data.calendarEvents.earnings.earningsDate[0].raw
        thisStockData.fundamentalData.grossMargins =
          yahooData.data.financialData.grossMargins.raw
        thisStockData.fundamentalData.profitMargins =
          yahooData.data.financialData.profitMargins.raw
      })
      .then(() => {
        getMacdData()
      })
  }

  const getMacdData = () => {
    $.ajax({
      /* The whisperingforest.org URL is not longer valid, I found a new one that is similar... */
      url: `https://www.alphavantage.co/query?function=MACD&symbol=${stockTicker}&interval=weekly&series_type=close&apikey=${apiKey}`,
      async: true,
      dataType: 'json',
      success: function(res) {
        console.log('MACD:')
        // console.log(res)
        Object.entries(res['Technical Analysis: MACD']).forEach(
          ([key, value], index) => {
            thisStockData.macdData.push(Number(value['MACD']))
          }
        )

        console.log(thisStockData)
        let apiEndpoint = apiUrl + '/updateWatchList'
        http.post(apiEndpoint, { thisStockData, email }).then(() => {
          window.location = '/Watchlist'
        })
      },
    })
  }

  const getPriceData = () => {
    //price data first
    $.ajax({
      /* The whisperingforest.org URL is not longer valid, I found a new one that is similar... */
      url: `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${stockTicker}&apikey=${apiKey}`,
      async: true,
      dataType: 'json',
      success: function(res) {
        console.log('PRICE: ')
        Object.entries(res['Weekly Time Series']).forEach(
          ([key, value], index) => {
            thisStockData.priceData.push(Number(value['4. close']))
          }
        )
        getAdxData()
      },
    })
  }

  let apiEndpoint =
    apiUrl + '/findStockData/' + stockTicker.toUpperCase() + '/' + email
  http.get(apiEndpoint).then(({ data }) => {
    if (data) {
      window.location = '/Watchlist'
    } else {
      getPriceData()
    }
  })
}

    const getFundamentalData = () => {
        yahooDataPull(stockTicker).then((yahooData) => {
            console.log(yahooData)
            //technical data
            thisStockData.averageVolumeTenDays = yahooData.data.summaryDetail.averageVolume10days.raw
            thisStockData.livePrice = yahooData.data.summaryDetail.ask.raw

    // values with weightings applied
    let fastSMAPositiveSlopeWeighted
    let slowSMAPositiveSlopeWeighted
    let fastGreaterSlowWeighted
    let macdPositiveSlopeWeighted
    let adxValueWeighted

    let fastSMASum = 0
    let fastSMALookbackSum = 0
    let slowSMASum = 0
    let slowSMALookbackSum = 0

    //fast SMA pos slope?
    for (let i = 0; i < fastSMA; i++) {
      fastSMASum += thisStockData.priceData[i]
    }
    fastSMAValue = fastSMASum / fastSMA
    // console.log("fastSMA Value: " + fastSMAValue)
    //fast SMA Lookback
    for (let i = 1; i < fastSMA + 1; i++) {
      fastSMALookbackSum += thisStockData.priceData[i]
    }
    fastSMALookbackValue = fastSMALookbackSum / fastSMA
    // console.log("fastSMA Lookback Value: " + fastSMALookbackValue)

    // fast SMA Positive slope check
    if (fastSMAValue > fastSMALookbackValue) {
      fastSMAPositiveSlopeWeighted = 1 * fastWeight
    } else {
      fastSMAPositiveSlopeWeighted = 0
    }
    // console.log("fast SMA Pos Slope Weighted: " + fastSMAPositiveSlopeWeighted)

    //slow SMA pos slope?
    for (let i = 0; i < slowSMA; i++) {
      slowSMASum += thisStockData.priceData[i]
    }
    slowSMAValue = slowSMASum / slowSMA
    // console.log("slowSMA Value: " + slowSMAValue)
    //slow SMA Lookback
    for (let i = 1; i < slowSMA + 1; i++) {
      slowSMALookbackSum += thisStockData.priceData[i]
    }
    slowSMALookbackValue = slowSMALookbackSum / slowSMA
    // console.log("slowSMA Lookback Value: " + slowSMALookbackValue)
    // slow SMA Positive slope check
    if (slowSMAValue > slowSMALookbackValue) {
      slowSMAPositiveSlopeWeighted = 1 * slowWeight
    } else {
      slowSMAPositiveSlopeWeighted = 0
    }
    // console.log("slow SMA Pos Slope Weighted: " + slowSMAPositiveSlopeWeighted)

    //fast > Slow
    if (fastSMAValue > slowSMAValue) {
      fastGreaterSlowWeighted = 1 * fastGreaterSlowWeight
    } else {
      fastGreaterSlowWeighted = 0
    }
    // console.log("fast greater Slow weighted: " + fastGreaterSlowWeighted)

    //MACD Pos slope?
    if (thisStockData.macdData[0] > thisStockData.macdData[1]) {
      macdPositiveSlopeWeighted = 1 * macdWeight
    } else {
      macdPositiveSlopeWeighted = 0
    }
    // console.log("macd pos slope weighted: " + macdPositiveSlopeWeighted)

    // apply ADX?
    if (slowSMAValue > slowSMALookbackValue) {
      adxValueWeighted = (thisStockData.adxData[0] * adxWeight) / 100
    } else {
      adxValueWeighted = 0
    }

    return (
      fastSMAPositiveSlopeWeighted +
      slowSMAPositiveSlopeWeighted +
      fastGreaterSlowWeighted +
      macdPositiveSlopeWeighted +
      adxValueWeighted
    )
  })

  return stockScore
}

export async function getWatchList(email) {
  try {
    let apiEndpoint = apiUrl + '/getWatchList'
    const watchListData = await http.post(apiEndpoint, { email })
    const userDataAndSettings = {
      userWatchList: watchListData.data.userWatchList,
      userSettings: watchListData.data.userSettings,
    }
    return userDataAndSettings
  } catch {
    return []
  }
}

export async function deleteWatchListItem(email, stockName, currentWatchList) {
  try {
    let updatedWatchList = currentWatchList.filter(watchListItem => {
      return watchListItem.stockName != stockName
    })
    let newWatchListArr = []
    updatedWatchList.forEach(watchListItem => {
      newWatchListArr.push(watchListItem._id)
    })

    let apiEndpoint = apiUrl + '/deleteWatchList'
    http
      .put(apiEndpoint, { email: email, watchList: newWatchListArr })
      .then(() => {
        window.location = '/Watchlist'
      })
  } catch {}
}
