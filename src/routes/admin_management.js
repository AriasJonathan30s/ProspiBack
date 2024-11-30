const express = require('express');
const router = express.Router();

const consts = require('../helpers/consts');
const admnServ = require('../services/admnSrv');

router.get('/erase-user',(req,res)=>{
    const headers = req.headers;
    try {
        if (headers.id) {
            admnServ.eraseUser(headers.id)
            .then(resp=>{
                res.json({message: consts.succsMssgs[resp]})
            })
            .catch(e=>{
                if (typeof(e) === 'number') {
                    console.warn(consts.errMssgs[e]);
                    if (e >= 1) {
                        res.status(501).json({ message: consts.errMssgs[e] });
                    } else {
                        res.status(500).json({ message: consts.errMssgs[e] });
                    }
                } else {
                    console.warn(e);
                    res.status(500).json({ message: consts.errMssgs[0] });
                }
            })
        } else {
            console.warn('Parametro erroneo');
            res.status(500).json({ message: consts.errMssgs[1] });
        }
    } catch (e) {
        console.warn(e);
        res.status(500).json({ message: consts.errMssgs[0] });
    }
})

router.get('/edit-user',(req,res)=>{
    const headers = req.headers;
    try {
        if (headers.euser && headers.id) {
            const editUser = JSON.parse(headers.euser);
            admnServ.editUser(headers.id, editUser)
            .then(resp=>{
                res.json({message: consts.succsMssgs[resp]});
            })
            .catch(e=>{
                if (typeof(e) === 'number') {
                    console.warn(consts.errMssgs[e]);
                    if (e >= 1) {
                        res.status(501).json({ message: consts.errMssgs[e] });
                    } else {
                        res.status(500).json({ message: consts.errMssgs[e] });
                    }
                } else {
                    console.warn(e);
                    res.status(500).json({ message: consts.errMssgs[0] });
                }
            })
        } else {
            console.warn('Parametro erroneo');
            res.status(500).json({ message: consts.errMssgs[1] });
        }
    } catch (e) {
        console.warn(e);
        res.status(500).json({ message: consts.errMssgs[0] });
    }
})

router.get('/load-users',(req,res)=>{
    const headers = req.headers;
    try {
        //Requerira validacion headers token admin mas adelante.
        admnServ.getUsers()
        .then(resp=>{
            res.setHeader('Access-Control-Allow-Origin','*').json({ message: resp });
        })
        .catch(e=>{
            if (typeof(e) === 'number') {
                console.warn(consts.errMssgs[e]);
                if (e >= 1) {
                    res.status(501).json({ message: consts.errMssgs[e] });
                } else {
                    res.status(500).json({ message: consts.errMssgs[e] });
                }
            } else {
                console.warn(e);
                res.status(500).json({ message: consts.errMssgs[0] });
            }
        })
    } catch (e) {
        console.warn(e);
        res.status(500).json({ message: consts.errMssgs[0] });
    }
})

router.get('/new-user',(req,res)=>{
    const headers = req.headers;
    try {
        if (headers.nuser) {
            const newUser = JSON.parse(headers.nuser);
            if (newUser.user && newUser.name && newUser.pass && newUser.lastName && newUser.address && newUser.birthDate && newUser.turn
                && newUser.initDate && newUser.role && newUser.ine) {
                
                admnServ.registerUser(newUser)
                .then(resp=>{
                    res.json({message:consts.succsMssgs[resp]});
                })
                .catch(e=>{
                    if (typeof(e) === 'number') {
                        console.warn(consts.errMssgs[e]);
                        if (e >= 1) {
                            res.status(501).json({ message: consts.errMssgs[e] });
                        } else {
                            res.status(500).json({ message: consts.errMssgs[e] });
                        }
                    } else {
                        console.warn(e);
                        res.status(500).json({ message: consts.errMssgs[0] });
                    }
                })
            } else {
                console.warn('Parametros erroneos');
                res.status(500).json({ message: consts.errMssgs[1] });
            }
        } else {
            console.warn('Parametro erroneo');
            res.status(500).json({ message: consts.errMssgs[1] });
        }
    } catch (e) {
        console.warn(e);
        res.status(500).json({ message: consts.errMssgs[0] });
    }
})

router.get('/login',(req,res)=>{
    const headers = req.headers;
    try {
        if (headers.user) {
            admnServ.login(headers.user)
            .then(resp=>{
                res.json({ message:'Bienvenido', token: resp });
            })
            .catch(e=>{
                if (typeof(e) === 'number') {
                    console.warn(consts.errMssgs[e]);
                    if (e >= 1) {
                        res.status(501).json({ message: consts.errMssgs[e] });
                    } else {
                        res.status(500).json({ message: consts.errMssgs[e] });
                    }
                } else {
                    console.warn(e);
                    res.status(500).json({ message: consts.errMssgs[0] });
                }
            })
        } else {
            console.warn('Parametro erroneo');
            res.status(500).json({ message: consts.errMssgs[1] });
        }
    } catch (error) {
        res.status(500).json({ message: consts.errMssgs[0] });
    }
})

module.exports = router;