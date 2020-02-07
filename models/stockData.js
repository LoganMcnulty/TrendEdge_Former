var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    
StockSchema = new Schema({
    stockName: { type: String, required: true, index: { unique: true } },
    livePrice: Number,
    averageVolumeTenDays: Number,
    lastActiveDate: Date,
    priceData: [{
        type: Number
    }],
    macdData: [{
        type: Number
    }],
    adxData: [{
        type: Number
    }],
    fundamentalData: {
        marketCap: String,
        sector: String,
        floatingShares: Number,
        sharesShort: Number,
        insidersPctHeld: Number,
        nextEarningsDate: Date,
        grossMargins: Number,
        profitMargins: Number
    }
});
module.exports = mongoose.model('Stock', StockSchema);
