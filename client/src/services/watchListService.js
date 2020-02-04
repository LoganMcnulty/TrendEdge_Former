import http from './httpService'
import { apiUrl } from '../config.json'
import $ from 'jquery'
import { getSettings } from '../services/userService'
import { yahooDataPUll, yahooDataPull } from './yahooFinance'

export function pullStockData(email, stockTicker, stockSector, currentWatchList) {
    console.log(email)
    console.log(stockTicker)
    console.log(currentWatchList)
    const apiKey = '07S5MN2IBXDCQAGB'
    let thisStockData = {
        livePrice: 0,
        indexName: stockTicker,
        sector: stockSector,
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
            // salesTTM: 0, <--- cannot find good source in yahoo
            // earningsTTM: 0, <-- cannot find good source in yahoo
            nextEarningsDate: "",
            grossMargins: 0,
            profitMargins: 0
        }
    }

    //kick off
    const getAdxData = () => {
        $.ajax({
            /* The whisperingforest.org URL is not longer valid, I found a new one that is similar... */
            url: `https://www.alphavantage.co/query?function=ADX&symbol=${stockTicker}&interval=weekly&time_period=10&apikey=${apiKey}`,
            async: true,
            dataType: 'json',
            success: function (res) {
                console.log('ADX:')
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
        console.log("Yahoo data...")
        yahooDataPull(stockTicker).then((yahooData) => {
            console.log(yahooData)

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


        }).then(()=> {
            
            getMacdData()
        })
    
      }

    const getMacdData = () => {
        $.ajax({
            /* The whisperingforest.org URL is not longer valid, I found a new one that is similar... */
            url: `https://www.alphavantage.co/query?function=MACD&symbol=${stockTicker}&interval=weekly&series_type=close&apikey=${apiKey}`,
            async: true,
            dataType: 'json',
            success: function (res) {
                console.log('MACD:')
                // console.log(res)
                Object.entries(res['Technical Analysis: MACD']).forEach(
                    ([key, value], index) => {
                        thisStockData.macdData.push(Number(value['MACD']))
                    }
                )


                console.log(thisStockData)
                currentWatchList.push(thisStockData);
                delete currentWatchList[0].tableData;
                delete currentWatchList[0]._id;
                let apiEndpoint = apiUrl + '/updateWatchList'
                http.put(apiEndpoint, { watchList: currentWatchList, email: email }).then(() => {
                    window.location = "/Watchlist"
                });
            }
        })
    }

    const getPriceData = () => {
        //price data first
        $.ajax({
            /* The whisperingforest.org URL is not longer valid, I found a new one that is similar... */
            url: `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${stockTicker}&apikey=${apiKey}`,
            async: true,
            dataType: 'json',
            success: function (res) {
                console.log("PRICE: ")
                Object.entries(res['Weekly Time Series']).forEach(
                    ([key, value], index) => {
                        thisStockData.priceData.push(Number(value['4. close']))
                    }
                )
                getAdxData()
            },
        })
    }
    getPriceData()
}

export async function calcStockHealth(email, thisStockData) {
    // final score object for each sector
    const stockScore = await getSettings(email).then((userSettings) => {
        //constant values from user
        let fastSMA = Number(userSettings.fastSMA)
        // console.log("fast SMA: " + fastSMA)
        let fastWeight = Number(userSettings.fastWeight) / 100
        // console.log("fast weight: " + fastWeight)
        let slowSMA = Number(userSettings.slowSMA)
        // console.log("slow SMA: " + slowSMA)
        let slowWeight = Number(userSettings.slowWeight) / 100
        // console.log("slow weight: " + slowSMAWeight)
        let fastGreaterSlowWeight = Number(userSettings.fastToSlowWeight) / 100
        // console.log("fast to slow weight: " + fastToSlowWeight)
        let macdWeight = Number(userSettings.MACDWeight) / 100
        // console.log("macd weight: " + macdWeight)
        let adxWeight = Number(userSettings.ADXWeight) / 100
        // console.log("adx Weight: " + adxWeight)

        // calculated values 
        let fastSMAValue
        let slowSMAValue
        let fastSMALookbackValue
        let slowSMALookbackValue
        let macdValue

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
        for (let i = 0; i < fastSMA; i++) { fastSMASum += thisStockData.priceData[i] }
        fastSMAValue = fastSMASum / fastSMA
        // console.log("fastSMA Value: " + fastSMAValue)
        //fast SMA Lookback
        for (let i = 1; i < fastSMA + 1; i++) { fastSMALookbackSum += thisStockData.priceData[i] }
        fastSMALookbackValue = fastSMALookbackSum / fastSMA
        // console.log("fastSMA Lookback Value: " + fastSMALookbackValue)

        // fast SMA Positive slope check
        if ((fastSMAValue) > (fastSMALookbackValue)) { fastSMAPositiveSlopeWeighted = (1 * fastWeight) }
        else { fastSMAPositiveSlopeWeighted = 0 }
        // console.log("fast SMA Pos Slope Weighted: " + fastSMAPositiveSlopeWeighted)

        //slow SMA pos slope?
        for (let i = 0; i < slowSMA; i++) { slowSMASum += thisStockData.priceData[i] }
        slowSMAValue = slowSMASum / slowSMA
        // console.log("slowSMA Value: " + slowSMAValue)
        //slow SMA Lookback
        for (let i = 1; i < slowSMA + 1; i++) { slowSMALookbackSum += thisStockData.priceData[i] }
        slowSMALookbackValue = slowSMALookbackSum / slowSMA
        // console.log("slowSMA Lookback Value: " + slowSMALookbackValue)
        // slow SMA Positive slope check
        if ((slowSMAValue) > (slowSMALookbackValue)) { slowSMAPositiveSlopeWeighted = (1 * slowWeight) }
        else { slowSMAPositiveSlopeWeighted = 0 }
        // console.log("slow SMA Pos Slope Weighted: " + slowSMAPositiveSlopeWeighted)

        //fast > Slow 
        if (fastSMAValue > slowSMAValue) { fastGreaterSlowWeighted = (1 * fastGreaterSlowWeight) }
        else { fastGreaterSlowWeighted = 0 }
        // console.log("fast greater Slow weighted: " + fastGreaterSlowWeighted)

        //MACD Pos slope?
        if (thisStockData.macdData[0] > thisStockData.macdData[1]) { macdPositiveSlopeWeighted = (1 * macdWeight) }
        else { macdPositiveSlopeWeighted = 0 }
        // console.log("macd pos slope weighted: " + macdPositiveSlopeWeighted)

        // apply ADX?
        if ((slowSMAValue > slowSMALookbackValue)) { adxValueWeighted = (thisStockData.adxData[0] * adxWeight / 100) }
        else { adxValueWeighted = 0 }

        return (fastSMAPositiveSlopeWeighted + slowSMAPositiveSlopeWeighted + fastGreaterSlowWeighted + macdPositiveSlopeWeighted + adxValueWeighted)
    })

    return stockScore
}

export async function getWatchList(email) {
    try {
        let apiEndpoint = apiUrl + '/getWatchList'
        const watchListData = await http.post(apiEndpoint, { email })
        return watchListData
    } catch {
        return []
    }
}

export async function deleteWatchListItem(email, indexName, currentWatchList) {
    try {
        
        let updatedWatchList =  currentWatchList.filter(watchListItem => {
            return watchListItem.indexName != indexName;
        })
        
        console.log(updatedWatchList);
        let apiEndpoint = apiUrl + '/deleteWatchList'
        http.put(apiEndpoint, { email: email, watchList: updatedWatchList }).then( () => {
            window.location = "/Watchlist"
        })
        
    } catch { }
}
