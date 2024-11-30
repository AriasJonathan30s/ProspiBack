const mongoose = require('mongoose');
const consts = require('../helpers/consts');

console.log('Conectando a mongo');
const mongoUrl =  `mongodb://${ consts.dbUser }:${ consts.dbPass }@${ consts.dbHost }:${ consts.dbPort }/${ consts.dbName }`;

mongoose.connect(mongoUrl, { socketTimeoutMS:3000 })
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Falla en la conexion.'));
db.once('open', () => console.log('Conexion exitosa.'));

module.exports = mongoose;