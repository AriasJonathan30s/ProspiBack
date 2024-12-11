const fetch = require('node-fetch')
const consts = require('../helpers/consts');

module.exports = {
    decodeToken: async (tkn)=>{
        try {
            return await fetch (`${ consts.prot }://${ consts.url }:${ consts.security }/decrypt/token`,
                {
                    method:'get',
                    headers:
                    { 
                        'Content-Type': 'application/json',
                        'tkn': tkn
                    }
                })
        } catch (e) {
            console.warn('Decode token Fetch error');
            return 0;
        }
    },
    genToken: async (tkn, acc)=>{
        try {
            return await fetch (`${ consts.prot }://${ consts.url }:${ consts.security }/encrypt/token`,
            {
                method:'get',
                headers:
                { 
                    'Content-Type': 'application/json',
                    'acc': acc,
                    'tkn': tkn
                }
            })    
        } catch (e) {
            console.warn('Encode token Fetch error');
            return 0;
        }
    },
    comparePass: async (pwds)=>{
        try {
            return await fetch (`${ consts.prot }://${ consts.url }:${ consts.security }/decrypt/compare-pwds`,
            {
                method:'get',
                headers:
                { 
                    'Content-Type': 'application/json',
                    'pwds': pwds
                }
            })    
        } catch (e) {
            console.warn('Encrypt new user Fetch error');
            return 0;
        }
    },
    encryptPass: async (newReg)=>{
        try {
            return await fetch (`${ consts.prot }://${ consts.url }:${ consts.security }/encrypt/password`,
            {
                method:'get',
                headers:
                { 
                    'Content-Type': 'application/json',
                    'value': newReg,
                }
            })    
        } catch (e) {
            console.warn('Encrypt new user Fetch error')
            return 0;
        }
    },
}