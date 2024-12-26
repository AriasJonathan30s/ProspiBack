const mongoose = require("../DAO/daoConn");

const ProspiProducts = mongoose.Schema(
    {
        name: { type: String, require: true },
        types: { type: Array, require: true },
    }
)

module.exports = mongoose.model('ProspiProducts', ProspiProducts)