const mongoose = require("../DAO/daoConn");

const ProspiCondiments = mongoose.Schema(
    {
        type: { type: String, require: true },
        conds: { type: Array, require: true },
    }
)

module.exports = mongoose.model('ProspiCondiments', ProspiCondiments)