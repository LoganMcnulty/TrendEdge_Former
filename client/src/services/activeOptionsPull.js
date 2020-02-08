import React from 'react'
const axios = require("axios");
var cheerio = require("cheerio");

export async function activeOptionsPull(ticker) {
// fake data for render testing
    // let fakeData = {
    //     optionType:["call","call","put","put"],
    //     strikePrice: ["1000","900","700","600"],
    //     contractPrice:["10.00","20.00","15.00","11.00"],
    //     todayChange:["2.00","4.00","3.00","4.50"],
    //     volume: ["200","300","150","160"],
    //     openInt: ["1500", "1800", "450", "500"],
    //     volOI: [".13", ".17", ".33", ".32"]
    //     }

    let result = {
        dates: [],
        optionType: [],
        strikePrice: [],
        contractPrice: [],
        todayChange: [],
        volume: [],
        openInt: [],
        volOI: []
    };

    const resultRows = []

    console.log("SCRAPING NASDAQ ACTIVE OPTIONS...")
    const optionsData = await axios.get(`https://old.nasdaq.com/symbol/${ticker}/option-chain/most-active`).then(response => {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        $("tbody tr").each(function (i, element) {
            result.dates.push($("td.most-active-col1").find("a").text());
            result.optionType.push($(element).find("td.most-active-col1").next("td").text());
            result.strikePrice.push($(element).find("td.most-active-col1").next("td").next("td").next("td").text());
            result.contractPrice.push($(element).find("td.most-active-col1").next("td").next("td").next("td").next("td").text());
            result.todayChange.push($(element).find("td.most-active-col1").next("td").next("td").next("td").next("td").next("td").text());
            result.volume.push($(element).find("td.most-active-col1").next("td").next("td").next("td").next("td").next("td").next("td").next("td").text());
            result.openInt.push($(element).find("td.most-active-col1").next("td").next("td").next("td").next("td").next("td").next("td").next("td").next("td").text());
        });
        function chunkString(str, length) {
            let string = str.match(new RegExp('.{1,' + length + '}', 'g'));
            return string;
        }
        result.dates = chunkString(result.dates[0], 12);
        result.optionType = result.optionType.filter(el => { return el != ""; });
        result.strikePrice = result.strikePrice.filter(el => { return el != ""; });
        result.contractPrice = result.contractPrice.filter(el => { return el != ""; });
        result.todayChange = result.todayChange.filter(el => { return el != ""; });
        result.volume = result.volume.filter(el => { return el != ""; });
        result.openInt = result.openInt.filter(el => { return el != ""; });

        for (let i = 0; i < result.optionType.length; i++){
            let volOI = (result.volume[i]/result.openInt[i]*100).toFixed(2)
            result.volOI.push(volOI + "%")
        }

        for (let x = 0; x < result.optionType.length; x++){
            let newResultRow = []
            newResultRow.push(result.dates[x], result.optionType[x], result.strikePrice[x], result.contractPrice[x], result.todayChange[x], result.volume[x], result.openInt[x], result.volOI[x])
            resultRows.push(newResultRow)
        }
        return resultRows
    })
    return optionsData
}
