const security = require('../fetcher/secureFetch');

const productFoodDTO = require('../DTO/productFoodDTO');
const queriesDTO = require('../DTO/consultasAdminDTO');
const orderDTO = require('../DTO/ordersDTO');

const dao = require('../DAO/dao');
const builder = require('../helpers/builder');

module.exports = {
    cnclOrd:(token, id)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje);
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1, name: 1 });
                    if (hasAccess) {
                        const cnclReqOpts = new orderDTO();
                        dao.updateOrderById(id, cnclReqOpts.getCnclOrd())
                        .then(resp=>{
                            resolve(5);
                        })
                        .catch(e=>{
                            console.warn('Update Order request error '+e);
                            reject(e);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json();
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e);
            })
        })   
    },
    getSales:(token, ranges)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje);
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1, name: 1 });
                    if (hasAccess) {
                        const parsedRanges = JSON.parse(ranges);
                        const queryFiltered = new queriesDTO();
                        const filterPrice = 0;
                        queryFiltered.setStartDate(builder.dateGetter(parsedRanges.start));
                        queryFiltered.setEndDate(builder.dateGetter(parsedRanges.end));
                        queryFiltered.setprice(filterPrice);
                        queryFiltered.setStatus(1)
                        dao.getOrders(queryFiltered.getRangeFilterNotInc(),{ _id:0, __v:0 })
                        .then(resp=>{
                            const prods = resp;
                            const prodsCons = builder.constructProds(prods)
                            const rngRsm = builder.rangeResm(prods);
                            dao.countOrders(queryFiltered.getRngCancOrd(),{})
                            .then(resp=>{
                                rngRsm.cnclOrd = resp;
                                resolve([rngRsm,prodsCons]);
                            })
                            .catch(e=>{
                                console.warn('Count orders request error '+e)    
                                reject(e)
                            })
                        })
                        .catch(e=>{
                            console.warn('GetOrders request error '+e)
                            reject(e)
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json();
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e);
            })
        })
    },
    chngOrdName: (token, id, cxName)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje);
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1, name: 1 });
                    if (hasAccess) {
                        const updOpts = {cxName: cxName}
                        dao.updateOrderById(id, updOpts)
                        .then(resp=>{
                            resolve(1)
                        })
                        .catch(e=>{
                            console.warn('Update orderById '+e);
                            reject(e);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json();
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e);
            })
        })
    },
    makePayment: (token, order, pay)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje);
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1, name: 1 });
                    if (hasAccess) {
                        const gotOrder = JSON.parse(order);
                        const gotPay = JSON.parse(pay);
                        gotOrder.payQuant = parseFloat(gotPay.pay);
                        gotOrder.payMethod = gotPay.payMethod;
                        gotOrder.change = gotPay.change;
                        gotOrder.status = 0;
                        const orderId = gotOrder._id;
                        delete gotOrder._id;
                        const orderUpd = gotOrder;
                        dao.updateOrderById(orderId, orderUpd)
                        .then(resp=>{
                            resolve(4);
                        })
                        .catch(e=>{
                            console.warn('Close order request error '+e);
                            reject(e);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json();
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e);
            })
        })
    },
    getOrder: (token, id)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje);
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1, name: 1 });
                    if (hasAccess) {
                        dao.getOrderById(id)
                        .then(resp=>{
                            let price = 0;
                            resp.products.map(product=>{
                                price += parseFloat(product.totPrice);
                            })
                            resp.price = price.toFixed(2);
                            resolve(resp);
                        })
                        .catch(e=>{
                            console.warn('Find order by id request error '+e);
                            reject(0);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json();
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e);
            })
        })
    },
    addToOrder: (token, order, prods)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje);
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1, name: 1 });
                    if (hasAccess) {
                        dao.getOrderById(order)
                        .then(resp=>{
                            if (resp) {
                                let reqProds = JSON.parse(prods);
                                reqProds.map(prod=>{
                                    prod.totPrice = ((parseFloat(prod.unitPrice) + parseFloat(prod.extraCost)) * prod.quant).toFixed(2);
                                    return prod;
                                })
                                let forder = resp;
                                if ((resp.products).length === 0) {
                                    forder.products = reqProds;
                                } else {
                                    reqProds.forEach(rqProd=>{
                                        forder.products.push(rqProd);
                                    })
                                }
                                dao.updateOrderById(order, forder)
                                .then(resp=>{
                                    if (resp) {
                                        resolve(3);
                                    } else {
                                        console.warn('Update orders by Id response error');
                                        reject(0);
                                    }
                                })
                                .catch(e=>{
                                    console.warn('Update orders by Id request error '+e);
                                    reject(e);
                                })
                            } else {
                                console.warn('Get orders by Id response error');
                                reject(0);
                            }
                        })
                        .catch(e=>{
                            console.warn('Get orders by Id request error '+e);
                            reject(e);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json();
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e);
            })
        })
    },
    getOrders:(token, show, opts)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje);
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1 });
                    if (hasAccess) {
                        const showOrd = JSON.parse(show);
                        const hideOpts = JSON.parse(opts);
                        let requestType;
                        if(typeof(showOrd.status)==='undefined' && typeof(showOrd.payMethod)==='undefined'){
                            // console.log('todos')
                            requestType = 0;
                        }
                        if(showOrd.status === 0 && typeof(showOrd.payMethod)==='undefined'){
                            // console.log('Cerrados')
                            requestType = 1;
                        }
                        if(showOrd.status === 0 && showOrd.payMethod==='Cancelado'){
                            // console.log('Cancelado')
                            requestType = 2;
                        }
                        if(showOrd.status === 1){
                            // console.log('activos')
                            requestType = 3;
                        }
                        let orderQuery;
                        const newQuery = new queriesDTO();
                        newQuery.setEndDate(new Date());
                        newQuery.setStartDate(new Date(`${newQuery.getEndDate().getFullYear()}-${newQuery.getEndDate().getMonth()+1}-${newQuery.getEndDate().getDate()} 00:00:00`));
                        switch (requestType) {
                            case 0:
                                orderQuery = newQuery.getRange();
                                break;
                            case 1:
                                orderQuery = newQuery.getRngClsOrd();
                                break;
                            case 2:
                                newQuery.setPayMethod(showOrd.payMethod);
                                orderQuery = newQuery.getRngCancOrd();
                                break;
                            case 3:
                                orderQuery = showOrd;
                                break;
                        }
                        dao.getOrders(orderQuery,hideOpts)
                        .then(resp=>{
                            const orders = [];
                            resp.map(order=>{
                                const requesDateHour = new Date(order.requesDateHour);
                                const newOrder = { id: order._id, cxName: order.cxName, prodQuant: order.products.length, status: order.status, requesDateHour: requesDateHour.toLocaleString(), payMethod: order.payMethod };
                                orders.push(newOrder);
                            })
                            resolve(orders);
                        })
                        .catch(e=>{
                            console.warn('Get orders request error '+e);
                            reject(e);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json();
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e);
            })
        })
    },
    newOrder:(token, order)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje);
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1, name: 1 });
                    if (await hasAccess) {
                        const newOrder = JSON.parse(order);
                        const date = new Date();
                        newOrder.requesDateHour = date.toString();
                        newOrder.employe = (await hasAccess)[0].name;
                        dao.regNewOrder(newOrder)
                        .then(resp=>{
                            if (resp) {
                                const params = newOrder;
                                const ordOpts = { _id:1 };
                                dao.getOrder(params,ordOpts)
                                .then(resp=>{
                                    if (resp) {
                                        const id = (resp._id).toString();
                                        resolve([0, id]);
                                    } else {
                                        console.warn('Get Order response error');
                                        reject(0);
                                    }
                                })
                                .catch(e=>{
                                    console.warn('Get Order request error '+ e);
                                    reject(0);        
                                })
                            } else {
                                console.warn('Reg new Order response error');
                                reject(0);
                            }
                        })
                        .catch(e=>{
                            console.warn('Reg new Order request error '+ e);
                            reject(0);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json()
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e)
            })
        })
    },
    getMenu:(products)=>{
        return new Promise((resolve, reject)=>{
            const menuProd = [];
            const filters = [];
            products.map(product=>{
                let buildProd;
                for (const prod of product.types) {
                    buildProd = { id: product._id.toString(), name: product.name, type: prod.name, detailArr: prod.detail, detail: builder.detailToString(prod.detail), price: prod.price };
                    menuProd.push(buildProd)
                }
                filters.push(product.name);
            });
            resolve([menuProd, filters]);
        })
    },
    editProduct:(token, id, product, detail, addlTypes)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje)
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1 })
                    if (hasAccess) {
                        dao.findProdByID(id)
                        .then( async gotProd=>{
                            const dbProd = new productFoodDTO();
                            dbProd.setProduct(await gotProd);
                            const reqProd = JSON.parse(product);
                            if (reqProd.name) {
                                dbProd.setName(reqProd.name);
                            }
                            const types = (dbProd.getTypes());
                            const typesNames = builder.extractNames(dbProd.getTypes());
                            if ((JSON.parse(addlTypes)).length) {
                                const newTypes = JSON.parse(addlTypes);
                                const nTypNames = builder.extractNames(newTypes);
                                const dsExist = nTypNames.map(name=>{
                                    if (typesNames.includes(name)) {
                                        return 1;
                                    }
                                })
                                dsExist.map((name,index)=>{
                                    if (typeof(name) === 'undefined') {
                                        types.push(newTypes[index])
                                    }
                                })
                                dbProd.setTypes(types);
                            } else {
                                const reqDet = JSON.parse(detail);
                                if (reqDet.name) {
                                    types[reqProd.index].name = reqDet.name;
                                }
                                if (reqDet.price) {
                                    types[reqProd.index].price = reqDet.price;
                                }
                                if (reqDet.detail.length) {
                                    types[reqProd.index].detail = reqDet.detail;
                                }    
                            }
                            dao.updateProdByID(dbProd.getId(), dbProd.getProduct())
                            .then(resp=>{
                                resolve(1);
                            })
                            .catch(e=>{
                                console.warn('Edit product request error');
                                reject(e);
                            })
                        })
                        .catch(e=>{
                            console.warn('Find by id product request error');
                            reject(e);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json()
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e)
            })
        })
    },
    buildProduct:(params, prod)=>{
        return new Promise((resolve, reject)=>{
            const parseParams = JSON.parse(params);
            const builtProd = builder.buildProd(parseParams.type, prod);
            resolve(builtProd);
        })
    },
    getProduct:(token, searchProd)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje)
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1 })
                    if (hasAccess) {
                        const product = JSON.parse(searchProd);
                        dao.findProdByID(product.id)
                        .then(resp=>{
                            resolve(resp);
                        })
                        .catch(e=>{
                            reject(0);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json()
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e)
            })
        })
    },
    getProducts:(token)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje)
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1 })
                    if (hasAccess) {
                        const params = {};
                        const opts = {__v:0};
                        dao.getProducts(params, opts)
                        .then(resp=>{
                            resolve(resp)
                        })
                        .catch(e=>{
                            console.warn('Get product request error');
                            reject(e);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json()
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e)
            })
        })
    },
    newProduct:(token, prod)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje)
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1 })
                    if (hasAccess) {
                        const product = JSON.parse(prod);
                        dao.newProduct(product)
                        .then(resp=>{
                            resolve(0)
                        })
                        .catch(e=>{
                            console.warn('New product request error');
                            reject(e);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json()
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e)
            })
        })
    },
    editCondiment:(token, condiment, id)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje)
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1 })
                    if (hasAccess) {
                        const editCond = JSON.parse(condiment)
                        dao.updateCondById(id, editCond)
                        .then(resp=>{
                            resolve(1)
                        })
                        .catch(e=>{
                            console.warn('Edit condiment request error');
                            reject(e);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json()
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e)
            })
        }) 
    },
    getCondiments:(token)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje)
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1 })
                    if (hasAccess) {
                        const params = {};
                        const options = {__v:0};
                        dao.getCondiments(params, options)
                        .then(resp=>{
                            if (resp) {
                                resolve(resp);
                            } else {
                                reject(0)
                            }
                        })
                        .catch(e=>{
                            console.warn('New condiment request error');
                            reject(e);
                        })
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json()
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e)
            })

        }) 
    },
    newCondiment: (token, newCond)=>{
        return new Promise((resolve, reject)=>{
            security.decodeToken(token)
            .then(async resp=>{
                if (resp.status === 200) {
                    const body = await resp.json();
                    const admin = JSON.parse(body.mensaje)
                    const hasAccess = dao.getUsers({ user: admin.user}, { _id: 1 })
                    if (hasAccess) {
                        const cond = JSON.parse(newCond);
                        if (cond.type && cond.conds.length) {
                            dao.newCondiment(cond)
                            .then(resp=>{
                                if (resp) {
                                    resolve(0);    
                                } else {
                                    reject(0)
                                }
                            })
                            .catch(e=>{
                                console.warn('New condiment request error');
                                reject(e);
                            })
                        } else {
                            reject(1);
                        }
                    } else {
                        console.warn('Get users response error');
                        reject(0);
                    }
                } else {
                    const error = await resp.json()
                    console.warn('Decode token response error '+ error.mensaje);
                    reject(error.mensaje);
                }
            })
            .catch(e=>{
                console.warn('Decode token request error '+e);
                reject(e)
            })

        })
    }
}