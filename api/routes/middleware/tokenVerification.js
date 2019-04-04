const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwt");

const verifyToken = (req,res,next) =>{
    const bearerHeader = req.headers["authorization"];
    
    // Check if undefined
    if(typeof bearerHeader !== "undefined"){
        const bearerToken =  bearerHeader.split(" ")[1]
        //decode token
        let decoded = jwt.verify(bearerToken,jwtConfig.SECRET,(err,payload)=>{
            if(err){
                res.status(401).send({msg:err.message})
            }else{
                next();
            }
        });
    }else{
        //Unauthorized
        res.status(401).send({msg:"Access token missing"})
    }
}

module.exports = verifyToken
