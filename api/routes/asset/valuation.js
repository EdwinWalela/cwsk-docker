const Router = require('express').Router();

// Models
const Valuation = require('../../models/assetValuation');
const Asset = require('../../models/assets');

// Middleware
const tokenVerification = require("../middleware/tokenVerification");
const permissions = require("../middleware/permissionVerification");

//@ROUTE: get all valutation
Router.get('/',tokenVerification,(req,res)=>{
    let allValuations = Valuation.findAll({include:[Asset]});

    Promise.all([allValuations]).then(values=>{
        res.send({valuations:values[0]});
    }).catch(err=>{
        res.status(500).send({err})
        console.log(err)
    });
})
//@ROUTE: create valuation
Router.post('/',tokenVerification,permissions.Create,(req,res)=>{
    let valuation = req.body;

    let newValuation = Valuation.create({
        price_now:valuation.price,
        details:valuation.details,
        assetId:valuation.asset
    });

    Promise.all([newValuation]).then(values=>{
       res.status(201).send({msg:"OK"})
    }).catch(err=>{
        if(err.name){
            res.status(400).send({
                err:{
                    msg:err.name,
                    fields:err.fields
                }
            });
        }else{
            res.status(500).send({err});
        }
    });
})
//@ROUTE: get valuation by PK
Router.get('/:id',tokenVerification,(req,res)=>{
    let valuation = Valuation.findByPk(req.params.id,{include:[Asset]});
    Promise.all([valuation]).then(values=>{
        if(values[0] !== null){
            res.send({valuation:values[0]});
        }else{
            res.status(404).send({msg:"Valuation Not Found"});
        }
    }).catch(err=>{
        res.status(500).send({err})
    });
});
//@ROUTE: update valuation by PK
Router.put('/:id',tokenVerification,permissions.Update,(req,res)=>{
    let valuation = req.body;

    let newValuation = Valuation.update({
        price_now:valuation.price,
        details:valuation.details,
        assetId:valuation.asset
    },{where:{
        id:req.params.id
    }});

    Promise.all([newValuation]).then(values=>{
        if (values[0 >= 1]) {
            res.send({msg:"OK"});
        }else{
            res.status(404).send({msg:"Valuation Not Found"});
        }
    }).catch(err=>{
        if(err.name){
            res.status(400).send({
                err:{
                    msg:err.name,
                    fields:err.fields
                }
            });
        }else{
            res.status(500).send({err});
        }
    });
})
//@ROUTE: delete valuation by PK
Router.delete('/:id',tokenVerification,permissions.Delete,(req,res)=>{
    let newValuation = Valuation.destroy({
        where:{
            id:req.params.id
        }
    });

    Promise.all([newValuation]).then(values=>{
        if (values[0] >=1) {
            res.status(204).send({});
        }else{
            res.status(404).send({msg:"Valuation Not Found"});
        }
    }).catch(err=>{
       res.status(500).send({});
    });
})

module.exports = Router;
