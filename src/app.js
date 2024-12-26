const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors({origin:"*"}));

const ADMIN_MANAGEMENT = require('./routes/admin_management');
const PRODUCTION_MANAGEMENT = require('./routes/production_management');

app.use('/administracion', ADMIN_MANAGEMENT);
app.use('/produccion', PRODUCTION_MANAGEMENT);

module.exports = app;