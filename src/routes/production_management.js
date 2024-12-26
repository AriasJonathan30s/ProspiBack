const express = require('express');
const consts = require('../helpers/consts');
const production = require('../services/prodcnSrv');

const router = express.Router();

router.get('/get-menu', (req,res)=>{
    const headers = req.headers;
    try {
        if (headers.access && headers.id && headers.prod && headers.dtl) {
            production.getProducts(headers.access)
            .then(resp=>{
                production.getMenu(resp)
                .then(resp=>{
                    console.log(resp)
                    res.json({ message: 'Construyendo' })
                })
                .catch(e=>{
                    throw e;
                })
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

router.get('/edit-product', (req,res)=>{
    const headers = req.headers;
    try {
        if (headers.access && headers.id && headers.prod && headers.dtl) {
            production.editProduct(headers.access, headers.id, headers.prod, headers.dtl, headers.addltps)
            .then(resp=>{
                res.json({ message: consts.succsMssgs[resp] });
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

router.get('/get-products', (req,res)=>{
    const headers = req.headers;
    try {
        if (headers.access) {
            production.getProducts(headers.access)
            .then(resp=>{
                res.json({ message: resp })
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

router.get('/new-product', (req,res)=>{
    const headers = req.headers;
    try {
        if (headers.access && headers.prod) {
            production.newProduct(headers.access, headers.prod)
            .then(resp=>{
                res.json({ message: consts.succsMssgs[resp] });
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

router.get('/edit-condiment', (req,res)=>{
    const headers = req.headers;
    try {
        if (headers.access && headers.condm && headers.id) {
            production.editCondiment(headers.access, headers.condm, headers.id)
            .then(resp=>{
                res.json({ message: consts.succsMssgs[resp] });
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

router.get('/get-condiments', (req,res)=>{
    const headers = req.headers;
    try {
        if (headers.access) {
            production.getCondiments(headers.access)
            .then(resp=>{
                res.json({ message: resp })
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

router.get('/new-condiment',(req,res)=>{
    const headers = req.headers;
    try {
        if (headers.access && headers.condm) {
            production.newCondiment(headers.access, headers.condm)
            .then(resp=>{
                res.json({ message: consts.succsMssgs[resp] })
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

module.exports = router;