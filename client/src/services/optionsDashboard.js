import React from 'react'
const axios = require("axios");
var cheerio = require("cheerio");

export const activeOptionsPull = (ticker) => {
    let result = {
        dates: [],
        optionType: [],
        strikePrice: [],
        contractPrice: [],
        todayChange: [],
        volume: [],
        openInt: []
    };

    let tableData = []

    axios.get(`https://old.nasdaq.com/symbol/${ticker}/option-chain/most-active`).then(response => {
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
    }).then(() => {
        console.log("SCRAPING NASDAQ ACTIVE OPTIONS...")
        console.log(result);
        // tableData = result.dates.map((options, index) => {
        //     return (
        //     <tr>
        //         <td>{options}</td>
        //         <td>{result.optionType[index]}</td>
        //         <td>{result.strikePrice[index]}</td>
        //         <td>{result.contractPrice[index]}</td>
        //         <td>{result.todayChange[index]}</td>
        //         <td>{result.volume[index]}</td>
        //         <td>{result.openInt[index]}</td>
        //         <td>{(result.volume[index]/result.openInt[index]).toFixed(2)*100}</td>
        //         </tr>
        //         )
        // })
        console.log(result)
        return result
    })
}
