const router = require("express").Router();
const db = require("../models");
const jwt = require('jsonwebtoken');
var cheerio = require("cheerio");
const axios = require("axios");

router.route("/api/user").post((req, res, next) => {
    db.User.create(req.body)
        .then(function () {
            const userDataScrubbed = {};
            userDataScrubbed.email = req.body.email;
            userDataScrubbed.name = req.body.name;
            userDataScrubbed.userSettings = req.body.userSettings;

            jwt.sign(userDataScrubbed, 'privatekey', { expiresIn: '1h' }, (err, token) => {
                if (err) { console.log(err) }
                res.send(token);
            });
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.status(409);
            res.send("User already exists");
            // console.log(err);
            // res.send(err);
        })
})

router.route("/api/auth").post((req, res, next) => {
    let userData = {
        email: req.body.email
    }

    db.User.findOne(userData, function (err, userData) {
        if (err) {
            console.log("ERROR");
        } else if (!userData) {
            res.json({ error: "User Not Found" });
        } else {
            userData.comparePassword(req.body.password, function (err, isMatch) {
                if (err) throw err;
                if (!isMatch) {
                    res.json({ error: "Wrong Password for this user" });
                } else {
                    const userDataScrubbed = {};
                    userDataScrubbed.email = userData.email;
                    userDataScrubbed.name = userData.name;
                    userDataScrubbed.userSettings = userData.userSettings;

                    jwt.sign(userDataScrubbed, 'privatekey', { expiresIn: '1h' }, (err, token) => {
                        if (err) { console.log(err) }
                        res.send(token);
                    });
                }
            })
        }
    })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        })
})

router.route("/api/getUserSettings").post((req, res, next) => {
    let userData = {
        email: req.body.email
    }

    db.User.findOne(userData, function (err, { userSettings }) {
        if (err) {
            res.json(err)
        } else {
            res.json(userSettings);
        }
    })
})

router.route("/api/userSettings").post((req, res, next) => {
    let userData = {
        email: req.body.email
    }

    db.User.findOneAndUpdate(userData, { "userSettings": req.body.userSettings })
        .then(function () {
            //add response for User watchlist update
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        })
})

router.route("/api/getWatchList").post((req, res, next) => {
    let userData = {
        email: req.body.email
    }
    db.User.findOne(userData).populate("userWatchList").then(function (returnData) {
        res.json(returnData);
    })
})

router.route("/api/updateWatchList").post((req, res, next) => {
    let userData = {
        email: req.body.email
    }
    db.Stock.create(req.body.thisStockData)
        .then(function (dbWatchList) {
            db.User.findOneAndUpdate(userData, { $push: { userWatchList: dbWatchList._id } }, { new: true }).then(() => {
                console.log("Watch List Updated!");
                res.send(true);
            })
        })
        .catch(function (err) {
            console.log("ERROR " + err)
            // If an error occurred, send it to the client
            res.json(err);
        })
})

router.route("/api/deleteWatchList").put((req, res, next) => {
    let userData = {
        email: req.body.email
    }

    db.User.findOneAndUpdate(userData, { "userWatchList": req.body.watchList })
        .then(function () {
            console.log("Watch List Updated!");
            res.send(true);
            //add response for User watchlist update
        })
        .catch(function (err) {
            console.log("ERROR " + err)
            // If an error occurred, send it to the client
            res.json(err);
        })
})


router.route("/api/createSectors").post((req, res) => {
    let sectors = req.body.mainSectors
    db.Sector.create(sectors, function (err, docs) {
        if (err) {
            console.log("Error: " + err)
        } else {
            console.log(docs)
        }
    })
})

router.route("/api/pullSectors").get((req, res) => {
    console.log("Pulling Sector Data from global sector DB")
    db.Sector.find({}, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            res.json(data)
        }
    })
})

router.route("/api/findStockData/:stockTicker/:email").get((req, res) => {
    console.log("Checking if Stock Data Exists")
    let stockData = {
        stockName: req.params.stockTicker
    }
    let userData = {
        email: req.params.email
    }
    db.Stock.findOne(stockData, function (err,foundStock) {
        if (err) throw err;
        if (!foundStock) {
            res.send(false)
        } else {
            db.User.findOneAndUpdate(userData, { $push: { userWatchList: foundStock._id } }, { new: true }).then(() => {
                console.log("Watch List Updated!");
                res.send(true);
            })
        }
    })
})

router.route("/api/updateSectors").put((req, res) => {
    console.log("UPDATING SECTOR " + req.body.symbol);
    sectorData = {
        indexName: req.body.symbol
    }
    db.Sector.findOneAndUpdate(sectorData, {
        "priceData": req.body.priceData,
        "macdData": req.body.macdData,
        "adxData": req.body.adxData,
        "topHoldingsNames": req.body.topHoldingsNames,
        "topHoldingsPcts": req.body.topHoldingsPcts
    }).then(function (res) {
        console.log("RESPONSE")
        console.log(res)
    }).catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
    })
})

router.route("/api/optionsPull/:stockTicker").get((req, res) => {
    let ticker = req.params.stockTicker
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

    async function optPull () {
        const optionsData = axios.get(`https://old.nasdaq.com/symbol/${ticker}/option-chain/most-active`).then(response => {
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
        }).then(data => {
            res.json(data)
        }).catch(function (err){
            console.log(err)
        })
    }
    optPull()
})

module.exports = router;