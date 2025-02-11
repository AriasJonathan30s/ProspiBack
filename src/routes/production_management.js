const express = require('express');
const consts = require('../helpers/consts');
const production = require('../services/prodcnSrv');
const builder = require('../helpers/builder');

const router = express.Router();

router.get('/cancel-order',(req,res)=>{
    const headers = req.headers;
    try {
        if (headers.access && headers.id) {
            production.cnclOrd(headers.access, headers.id)
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

router.get('/get-sales-range',(req,res)=>{
    const headers = req.headers;
    try {
        if (headers.access && headers.ranges) {
            production.getSales(headers.access, headers.ranges)
            .then(resp=>{
                res.json({ message: resp });
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

router.get('/edit-order-name',(req,res)=>{
    const headers = req.headers;
    try {
        if (headers.access && headers.id && headers.cxname) {
            production.chngOrdName(headers.access, headers.id, headers.cxname)
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

router.get('/make-payment',(req,res)=>{
    const headers = req.headers;
    try {
        if (headers.access && headers.order && headers.payment) {
            production.makePayment(headers.access, headers.order, headers.payment)
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

router.get('/get-order', (req,res)=>{
    const headers = req.headers;
    try {
        if (headers.access && headers.id) {
            production.getOrder(headers.access, headers.id)
            .then(resp=>{
                res.json({ message: resp });
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

router.get('/add-to-order', (req,res)=>{
    const headers = req.headers;
    try {
        // console.log(headers)
        if (headers.access && headers.order && headers.prods) {
            production.addToOrder(headers.access, headers.order, headers.prods)
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

router.get('/get-orders', (req,res)=>{
    const headers = req.headers;
    try {
        if (headers.access && headers.show && headers.opts) {
            production.getOrders(headers.access, headers.show, headers.opts)
            .then(resp=>{
                res.json({ message:  resp})
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

router.get('/set-new-order', (req,res)=>{
    const headers = req.headers;
    try {
        if (headers.access && headers.order) {
            production.newOrder(headers.access, headers.order)
            .then(resp=>{
                res.json({ message: consts.succsMssgs[resp[0]], id: resp[1] })
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

router.get('/get-menu', (req,res)=>{
    const headers = req.headers;
    try {
        if (headers.access) {
            production.getProducts(headers.access)
            .then(resp=>{
                production.getMenu(resp)
                .then(resp=>{
                    const menu = resp;
                    production.getCondiments(headers.access)
                    .then(async resp=>{
                        const condNames = builder.condmntGroup(resp);
                        res.json({ message: [menu,await condNames] });
                    })
                    .catch(e=>{
                        throw e;
                    })
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

router.get('/get-product-and-ingredients',(req,res)=>{
    const headers = req.headers;
    try {
        if (headers.access && headers.prod) {
            production.getProduct(headers.access, headers.prod)
            .then(resp=>{
                production.buildProduct(headers.prod, resp)
                .then(resp=>{
                    const builtProd = resp;
                    production.getCondiments(headers.access)
                    .then(resp=>{
                        res.json({ message: { prod: builtProd, cond: resp } });
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