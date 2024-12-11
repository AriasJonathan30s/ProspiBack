const mongoose = require("../DAO/daoConn");

const ProspiBusiness = mongoose.Schema(
    {
        name: { type: String, require: true },
        role: { type: String, require: true },
        scheduleDaysStart: { type: String, require: true },
        scheduleDaysEnd: { type: String, require: true },
        scheduleHoursStart: { type: String, require: true },
        scheduleHoursEnd: { type: String, require: true }, 
        address: { type: String, require: true },
        zipcode: { type: String, require: true },
        owner : { type: String, require: true },
        fundationDate : { type: String, require: true }
    }
)

module.exports = mongoose.model('ProspiBusiness', ProspiBusiness)