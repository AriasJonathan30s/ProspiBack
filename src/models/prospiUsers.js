const mongoose = require("../DAO/daoConn");

const ProspiUsers = mongoose.Schema(
    {
        user: { type: String, require: true },
        pass: { type: String, require: true },
        name: { type: String, require: true },
        lastName: { type: String, require: true },
        birthDate: { type: String, require: true },
        role: { type: String, require: true }, 
        area: { type: String, require: true },
        initDate: { type: String, require: true },
        endDate : { type: String, require: false },
        ine : { type: String, require: true },
        address: { type: String, require: true },
        turn: { type: String, require: true },
        tel: { type: String, require: true },
        email: { type: String, require: true }
    }
)

module.exports = mongoose.model('ProspiUsers', ProspiUsers)