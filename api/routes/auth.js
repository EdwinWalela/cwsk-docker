const Router = require('express').Router();
const User = require("../models/users");
const Role = require("../models/roles");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

Router.post('/register',(req,res)=>{
	let user = req.body
	let newUser = User.create({
		firstName:user.firstName,
		lastName:user.lastName,
		alias:user.alias,
		phone:user.phone,
		email:user.email,
		idno:user.idno,
		dob:user.dob,
		resetCode:"",
		permissions:"",
		password:user.password,
		roleId:1,
		tpsId:user.tps,
		confirmed:false
	});
	Promise.all([newUser]).then(values=>{
		res.status(201).send({msg:"OK"})
	}).catch(err=>{
			res.status(500).send({err})
	});
});

Router.post('/login',(req,res)=>{

	let userlogin = req.body

	let user = User.findOne({
		where:{
			email:userlogin.email
		}
	});

	Promise.all([user]).then(values=>{
		console.log(values[0])
		if (values[0] !== null) {
			let user = values[0];

			let auth = bcrypt.compareSync(userlogin.password, user.password);

			if(auth){
				let jwtPayload = {
					id:user.id,
					perm:user.permissions
				  }

				  jwt.sign(
					{user:jwtPayload},
					jwtConfig.SECRET,
					{expiresIn:jwtConfig.EXPIRY},
					(err,token)=>{
						if(err){
						res.status(500).send({err})
						}else{
						res.send({token,userId:user.id})
						}
					});
			}else{
				res.status(401).send({msg:"Incorrect combination"})
			}
		}else{
			res.status(404).send({msg:"User Not Found"})
		}
	}).catch(err=>{
		res.status(500).send({err})
	});
});

module.exports = Router;
