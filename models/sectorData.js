var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    
SectorSchema = new Schema({
    indexName: { type: String, required: true, index: { unique: true } },
    sectorName: {type: String},
    lastActiveDate: Date,
    topHoldingsNames: [{
        type: String
    }],
    topHoldingsPcts: [{
        type:Number
    }],
    priceData: [{
        type: Number
    }],
    macdData: [{
        type: Number
    }],
    adxData: [{
        type: Number
    }]
});
module.exports = mongoose.model('Sector', SectorSchema);

