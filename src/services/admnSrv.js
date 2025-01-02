const consts = require('../helpers/consts');
const builder = require('../helpers/builder');

const business = require('../DTO/businessDTO');

const security = require('../fetcher/secureFetch');
const dao = require('../DAO/dao');

module.exports = {
    editBusiness: (token, editBsns)=>{
        return new Promise((resolve, reject) => {
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje)
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1 })
                    if (hasAccess) {
                        const bsns = JSON.parse(editBsns);
                        const id = bsns.id;
                        delete bsns.id
                        if (bsns.scheduleDaysStart) bsns.scheduleDaysStart = consts.week[builder.weekDayGetter(bsns.scheduleDaysStart)];
                        if (bsns.scheduleDaysEnd) bsns.scheduleDaysEnd = consts.week[builder.weekDayGetter(bsns.scheduleDaysEnd)];
                        if (bsns.scheduleHoursStart) bsns.scheduleHoursStart = builder.timeFormater(bsns.scheduleHoursStart);
                        if (bsns.scheduleHoursEnd) bsns.scheduleHoursEnd = builder.timeFormater(bsns.scheduleHoursEnd);
                        dao.updateBsnsById(id, bsns)
                        .then(resp=>{
                            if (resp) {
                                resolve(1);    
                            } else {
                                reject(0)
                            }
                        })
                        .catch(e=>{
                            console.warn('Update business request error');
                            reject(e);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    console.warn('Decode token response error '+ resp);
                    reject(resp);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e)
            })

        })
    },
    loadBusiness: (token)=>{
        return new Promise((resolve, reject) => {
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje)
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1 })
                    if (hasAccess) {
                        dao.getBsnesses()
                        .then(resp=>{
                            if (resp) {
                                resolve(resp[0]);
                            } else {
                                reject(0);
                            }
                        })
                        .catch(e=>{
                            console.warn('Get businesses request error');
                            reject(e);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    console.warn('Decode token response error '+ resp);
                    reject(resp);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e)
            })

        })
    },
    registerBusiness: (token, profile)=>{
        return new Promise((resolve, reject) => {
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje)
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1 })
                    if (hasAccess) {
                        dao.getBsnesses({},{})
                        .then(resp=>{
                            if (!resp.length) {
                                const bsPrfl= new business();
                                bsPrfl.business(JSON.parse(profile));
                                bsPrfl.setScheduleDaysStart(consts.week[builder.weekDayGetter(bsPrfl.getScheduleDaysStart())]);
                                bsPrfl.setScheduleDaysEnd(consts.week[builder.weekDayGetter(bsPrfl.getScheduleDaysEnd())]);
                                bsPrfl.setScheduleHoursStart(builder.timeFormater(bsPrfl.getScheduleHoursStart()));
                                bsPrfl.setScheduleHoursEnd(builder.timeFormater(bsPrfl.getScheduleHoursEnd()));
                                dao.regBsnss(bsPrfl.getBusiness())
                                .then(resp=>{
                                    console.log(resp)
                                    resolve(0);
                                })
                                .catch(e=>{
                                    console.warn('New business request error');
                                    reject(e);
                                })
                            } else {
                                reject(5);
                            }
                        })
                        .catch(e=>{
                            console.warn('Get businesses request error');
                            reject(e);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    console.warn('Decode token response error '+ resp);
                    reject(resp);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e)
            })
        });
    },
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
                        console.log(e)
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