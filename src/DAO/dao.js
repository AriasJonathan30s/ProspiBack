const builder = require('../models/mongoosebuilder');

const users = require('../models/prospiUsers');
const business = require('../models/prospiBusiness');


module.exports = {
    updateBsnsById: (id, params)=>{
        return new Promise((resolve, reject) => {
            business.findByIdAndUpdate(id, params)
            .then(found=>{
                resolve(found);
            })
            .catch(e=>{
                console.warn('Update business by id Query error ' + e);
                reject(e);
            })
        })
    },
    getBsnesses:(params,opts)=>{
        return new Promise((resolve, reject) => {
            business.find(params,opts)
            .then(found=>{
                resolve(found);
            })
            .catch(e=>{
                console.warn('Get businesses Query error ' + e);
                reject(e);
            })
        })
    },
    regBsnss:(profile)=>{
        return new Promise((resolve, reject) => {
            const newBusiness = business(profile);
            newBusiness.save()
            .then(saved=>{
                resolve(saved);
            })
            .catch(e=>{
                console.warn('New business Query error ' + e);
                reject(0);
            })
        })
    },
    eraseUser: (param)=>{
        return new Promise((resolve, reject) => {
            users.findOneAndDelete(param)
            .then(erased=>{
                resolve(erased);
            })
            .catch(e=>{
                console.warn('Erase user Query error ' + e);
                reject(e);
            })
        })
    },
    
    updateUserById: (id,vals)=>{
        return new Promise((resolve, reject) => {
            users.findByIdAndUpdate(id,vals)
            .then(found=>{
                resolve(found);
            })
            .catch(e=>{
                console.warn('Update user Query error ' + e);
                reject(0);
            })
        })
    },
    getUsers: (param, opt)=>{
        return new Promise((resolve, reject) => {
            users.find(param,opt)
            .then(found=>{
                resolve(found);
            })
            .catch(e=>{
                console.warn('Get user Query error ' + e);
                reject(0);
            })
        })
    },
    getUser: (param, opt)=>{
        return new Promise((resolve, reject) => {
            users.findOne(param, opt)
            .then(found=>{
                resolve(found);
            })
            .catch(e=>{
                console.warn('Get user Query error ' + e);
                reject(0);
            })
        })
    },
    newUser: (reg)=>{
        return new Promise((resolve, reject) => {
            const newUser = users(reg)
            newUser.save()
            .then(saved=>{
                resolve(saved);
            })
            .catch(e=>{
                console.warn('New user Query error ' + e);
                reject(0);
            })
        })
    },
    genObjId: (id)=>{
        return new Promise((resolve, reject) => {
            builder.id(id)
            .then(resp=>{
                resolve(resp);
            })
            .catch(e=>{
                reject(e)
            })
        }) 
    },
}