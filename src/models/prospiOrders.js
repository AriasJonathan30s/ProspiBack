const mongoose = require("../DAO/daoConn");

const ProspiOrders = mongoose.Schema(
    {
        cxName: { type: String, require: true },
        products: { type: Array, require: true },
        requesDateHour: { type: String, require: true },
        price: { type: Number, require: false },
        payQuant: { type: Number, require: false },
        payMethod: { type: String, require: false }, 
        change: { type: Number, require: false },
        status: { type: Number, require: true },
    }
)

module.exports = mongoose.model('ProspiOrders', ProspiOrders)