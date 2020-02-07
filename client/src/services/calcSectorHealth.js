import React from 'react'
import auth from './authService'
import { PopoverExampleMulti } from '../components/popover'


export function calcSectorHealth(sectorData) {
    const userData = auth.getCurrentUser();

    // console.log(sectorData);
    let allSectorHealthData =[]

    //constant values from user
        let fastSMA = Number(userData ? userData.userSettings.fastSMA : 10)
        // console.log("fast SMA: " + fastSMA)
        let fastWeight = Number(userData ? userData.userSettings.fastWeight: 20)/100
        // console.log("fast weight: " + fastWeight)
        let slowSMA = Number(userData ? userData.userSettings.slowSMA : 40)
        // console.log("slow SMA: " + slowSMA)
        let slowWeight = Number(userData ? userData.userSettings.slowWeight : 20)/100
        // console.log("slow weight: " + slowSMAWeight)
        let fastGreaterSlowWeight = Number(userData ? userData.userSettings.fastToSlowWeight : 20)/100
        // console.log("fast to slow weight: " + fastToSlowWeight)
        let macdWeight = Number(userData ? userData.userSettings.MACDWeight : 20)/100
        // console.log("macd weight: " + macdWeight)
        let adxWeight = Number(userData ? userData.userSettings.ADXWeight : 20)/100
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


    // final score object for each sector
        let sectorAndHealthScore = {
            symbol: "",
            score: 0
        }
    
        let fastSMASum = 0
        let fastSMALookbackSum = 0
        let slowSMASum = 0
        let slowSMALookbackSum = 0
        let idCounter = 0

        for (let x = 0; x < sectorData.data.length; x++){
            sectorAndHealthScore.symbol = sectorData.data[x].indexName
            sectorAndHealthScore.sectorName = sectorData.data[x].sectorName
            sectorAndHealthScore.priceTZero = sectorData.data[x].priceData[0]

            let holdingsTableData = {
                companies: sectorData.data[x].topHoldingsNames,
                pctHeld: sectorData.data[x].topHoldingsPcts
            }
            
            sectorAndHealthScore.topHoldings = 
                <PopoverExampleMulti 
                key={idCounter} 
                id = {idCounter}
                purpose={"Top Holdings"}
                popoverBody={
                    <div className="table">
                        <thead>
                            <tr>
                            <th scope="col">Stock</th>
                            <th scope="col">% Held</th>
                            </tr>
                        </thead>
                        <tbody>
                            {holdingsTableData.companies.map((companies, index) => {
                                const pctHeldMap = holdingsTableData.pctHeld[index]
                                return <tr><td>{companies}</td><td>{(pctHeldMap*100).toFixed(2)}</td></tr>
                            })}
                        </tbody>
                    </div>
                }
                />

            sectorAndHealthScore.id = idCounter
            // console.log(sectorAndHealthScore.symbol)

            //fast SMA pos slope?
                for(let i = 0; i<fastSMA;i++){fastSMASum+=sectorData.data[x].priceData[i]}
                fastSMAValue = fastSMASum/fastSMA
                // console.log("fastSMA Value: " + fastSMAValue)
            //fast SMA Lookback
                for(let i = 1; i<fastSMA+1;i++){fastSMALookbackSum+=sectorData.data[x].priceData[i]}
                fastSMALookbackValue = fastSMALookbackSum/fastSMA
                // console.log("fastSMA Lookback Value: " + fastSMALookbackValue)

            // fast SMA Positive slope check
                if((fastSMAValue) > (fastSMALookbackValue)){fastSMAPositiveSlopeWeighted=(1*fastWeight)}
                else{fastSMAPositiveSlopeWeighted=0}
            // console.log("fast SMA Pos Slope Weighted: " + fastSMAPositiveSlopeWeighted)

            //slow SMA pos slope?
                for(let i = 0; i<slowSMA;i++){slowSMASum+=sectorData.data[x].priceData[i]}
                slowSMAValue = slowSMASum/slowSMA
                // console.log("slowSMA Value: " + slowSMAValue)
            //slow SMA Lookback
                for(let i = 1; i<slowSMA+1;i++){slowSMALookbackSum+=sectorData.data[x].priceData[i]}
                slowSMALookbackValue = slowSMALookbackSum/slowSMA
                // console.log("slowSMA Lookback Value: " + slowSMALookbackValue)
            // slow SMA Positive slope check
                if((slowSMAValue) > (slowSMALookbackValue)){slowSMAPositiveSlopeWeighted=(1*slowWeight)}
                else{slowSMAPositiveSlopeWeighted=0}
                // console.log("slow SMA Pos Slope Weighted: " + slowSMAPositiveSlopeWeighted)

            //fast > Slow 
                if(fastSMAValue > slowSMAValue){fastGreaterSlowWeighted=(1*fastGreaterSlowWeight)}
                else{fastGreaterSlowWeighted=0}
                // console.log("fast greater Slow weighted: " + fastGreaterSlowWeighted)

            //MACD Pos slope?
                if (sectorData.data[x].macdData[0] > sectorData.data[x].macdData[1]){macdPositiveSlopeWeighted = (1*macdWeight)}
                else{macdPositiveSlopeWeighted = 0}
                // console.log("macd pos slope weighted: " + macdPositiveSlopeWeighted)

            // apply ADX?
                if ((slowSMAValue > slowSMALookbackValue)){adxValueWeighted=(sectorData.data[x].adxData[0]*adxWeight/100)}
                else{adxValueWeighted=0}

                sectorAndHealthScore.score = ((fastSMAPositiveSlopeWeighted + slowSMAPositiveSlopeWeighted + fastGreaterSlowWeighted + macdPositiveSlopeWeighted + adxValueWeighted)*100).toFixed(1)
            
            allSectorHealthData.push(sectorAndHealthScore)

            idCounter++
            fastSMAValue = 0
            slowSMAValue = 0
            fastSMALookbackValue = 0
            slowSMALookbackValue = 0
            fastSMASum = 0
            fastSMALookbackSum = 0
            slowSMASum = 0
            slowSMALookbackSum = 0
            fastSMAPositiveSlopeWeighted = 0
            slowSMAPositiveSlopeWeighted = 0
            fastGreaterSlowWeighted = 0
            macdPositiveSlopeWeighted = 0
            adxValueWeighted = 0

            sectorAndHealthScore = {
                symbol: "",
                score: 0
            }            
        }
    return allSectorHealthData

  }