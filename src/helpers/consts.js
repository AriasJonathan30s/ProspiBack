module.exports = {
    prot: 'http',
    url: '192.168.0.100',
    security: process.env.SISECURL || 3002,
    admnKey: 'AuthPersonel',

    dbUser: 'admin',
    dbPass: 'SP1811prospi.01JR_AC',
    dbHost: 'localhost',
    dbPort: '27017',
    dbName: 'prospiDb',

    succsMssgs: ['Registro exitoso','Actualizacion exitosa','Registro eliminado'],
    errMssgs: ['Error de sistema','Parametros incorrectos','Usuario existente','Sin registros','Contraseña incorrecta'],
}