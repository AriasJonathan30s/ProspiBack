const security = require('../fetcher/secureFetch');
const dao = require('../DAO/dao');

module.exports = {
    eraseUser: (userId)=>{
        return new Promise((resolve, reject) => {
            dao.genObjId(userId)
            .then(resp=>{
                if (resp) {
                    params = {_id:resp}
                    dao.eraseUser(params)
                    .then(resp=>{
                        if (resp) {
                            resolve(2)    
                        } else {
                            console.warn('Erase user response error');
                            reject(0);
                        }
                    })
                    .catch(e=>{
                        console.warn('Erase user request error');
                        reject(e);
                    })
                    resolve(2)    
                } else {
                    console.warn('Generate object id response error');
                    reject(0);
                }
            })
            .catch(e=>{
                console.warn('Generate object id request error');
                reject(e);
            })
        })
    },
    editUser: (userId, userVals)=>{
        return new Promise(async (resolve, reject) => {
            if (userVals.pass) {
                const cryptPass = await security.encryptPass();
                if (cryptPass.status === 200) {
                    const body = await cryptPass.json();
                    userVals.pass = body.mensaje;
                }
            }
            const usrId = userId;
            const usrOpts = userVals;
            dao.updateUserById(usrId, usrOpts)
            .then(resp=>{
                if (resp) {
                    resolve(1);
                } else {
                    console.warn('Update user by Id response error');
                    reject(0);
                }
            })
            .catch(e=>{
                console.warn('Update user by Id response error');
                reject(e);
            })
        })
    },
    getUsers: ()=>{
        return new Promise((resolve, reject) => {
            const usrParams = {};
            const usrOpts = {
                _id:1, user:1, name: 1, lastName:1, birthDate:1, role:1, area:1,
                initDate:1, endDate:1, ine:1, address:1, turn:1, tel:1, email:1
            };
            dao.getUsers(usrParams, usrOpts)
            .then(resp=>{
                if (resp) {
                    resolve(resp);    
                } else {
                    reject(3);
                }
            })
            .catch(e=>{
                console.warn('Get users request error')
                reject(e);
            })
        })
    },
    login: (usr)=>{
        return new Promise((resolve, reject) => {
            const usrLog = JSON.parse(usr);
            const usrParam = { user: usrLog.user };
            const usrOpt = { user:1, pass:1, role:1, area:1, _id:0 };
            dao.getUser(usrParam, usrOpt)
            .then(resp=>{
                if (resp) {
                    const fndUsr = resp;
                    const passwrds = JSON.stringify({ reqPass: usrLog.pass, fndPass: fndUsr.pass });
                    security.comparePass(passwrds)
                    .then(async resp=>{
                        if (resp.status === 200) {
                            const loginBody = await resp.json();
                            const user = JSON.stringify(fndUsr);
                            security.genToken(loginBody.mensaje, user)
                            .then(async resp=>{
                                if (resp.status === 200) {
                                    const tkBody = await resp.json();
                                    resolve(tkBody.mensaje);
                                } else {
                                    console.warn('Enconde token response error '+resp)
                                    reject(resp);
                                }
                            })
                            .catch(e=>{
                                console.warn('Encode token request error '+e);
                                reject(e)
                            })
                            
                        } else if(resp.status === 501) {
                            const body = await resp.json();
                            const mssg = body.mensaje === 'WP' ? 4 : 0;
                            reject(mssg);
                        } else {
                            console.warn('Encrypt pass response error '+ resp);
                            reject(resp);
                        }
                    })
                    .catch(e=>{
                        console.warn('Encrypt pass request error '+e);
                        reject(e)
                    })
                } else {
                    console.warn('Get user response error')
                    reject(1)
                }
            })
            .catch(e=>{
                console.warn('Get user request error'+e)
                reject(e);
            })

            
        })
    },
    registerUser: (newReg)=>{
        return new Promise((resolve, reject) => {
            security.encryptPass(newReg.pass)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json()
                    newReg.pass = body.mensaje
                    const usrParams = { user: newReg.user };
                    const usrOpt = { user: 1 };
                    dao.getUser(usrParams, usrOpt)
                    .then(resp=>{
                        if (resp) {
                            console.warn(resp)
                            reject(2);
                        } else {
                            dao.newUser(newReg)
                            .then(resp=>{
                                if (resp) {
                                    console.log(resp);
                                    resolve(0);
                                } else {
                                    console.warn('Register user response error')
                                    reject(0);
                                }
                            })
                            .catch(e=>{
                                console.warn('Register user request error');
                                reject(e);
                            })
                        }
                    })
                    .catch(e=>{
                        console.warn('Get user request error');
                        reject(e);
                    })
                } else {
                    console.warn('Encrypt response error')
                    reject(0)
                }
            })
            .catch(e=>{
                console.warn('Encrypt request error')
                reject(e);
            })
        })
        
    },
}