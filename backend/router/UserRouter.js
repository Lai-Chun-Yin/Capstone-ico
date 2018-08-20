const express = require("express");
const jwt = require('jwt-simple');
// const config = require('../config');
const passport = require('passport');
const axios = require('axios');
require('dotenv').config();

module.exports = class UserRouter {
    constructor(userService){
        this.userService = userService;
    }

    router(){
        let router = express.Router();
        router.post('/auth/login',this.localLogin.bind(this));
        router.post('/auth/signup',this.localSignUp.bind(this));
        router.post('/auth/facebook',this.facebookLogin.bind(this));
        router.post('/auth/google',this.googleLogin.bind(this));
        router.get('/user/profilePic',passport.authenticate('jwt', { session: false }),this.fetchProfilePic.bind(this));
        router.post('/user/profilePic',passport.authenticate('jwt', { session: false }),this.uploadProfilePic.bind(this));
        
        return router;
    }

    async localLogin(req,res){
        try{
            if(!req.body.email||!req.body.password){
                throw new Error("Inadequate login details");
            }
            var email = req.body.email;
            var password = req.body.password;
            const result = await this.userService.localLogin(email,password);
            if(result[0]){
                var payload = {
                    id: result[0].id
                };
                var token = jwt.encode(payload, process.env.JWT_SECRET);
                
                res.json({
                    token: token,
                    userId: result[0].id
                });
            } else {
                throw new Error('User not found');
            }
        } catch(err) {
            res.sendStatus(401).json(err);
        }
    }

    localSignUp(req,res){
        this.userService.verifyUserByEmail(req.body.email)
        .then((result)=>{
            if(result.length>0){throw new Error("Email has been used")}
            return this.userService.localSignUp(req.body.email,req.body.password)
        }).then((result)=>{
            var payload = {
                id: result[0]
            };
            var token = jwt.encode(payload, process.env.JWT_SECRET);
            
            res.json({
                token: token,
                userId: result[0]
            });
        }).catch(err=>{
            res.sendStatus(401).json(err);
        });
    }

    async facebookLogin(req,res){
        if (req.body.access_token) {
            var accessToken = req.body.access_token;
            try{
                let data = await axios.get(`https://graph.facebook.com/me?access_token=${accessToken}`);
                if(data.data.error){throw new Error("Error on verifying FB Access Token");}
                
                let userId;
                let user = await this.userService.findUserByOAuthId('facebook',data.data.id);
                if(user[0]){
                    userId = user[0].id
                }else{
                    let newUser = await this.userService.facebookSignUp(data.data.id);
                    userId =  newUser[0];
                }
                let payload = {
                    id : userId,
                    accessToken
                }
                
                // Return the JWT token after checking
                var token = jwt.encode(payload, process.env.JWT_SECRET);
                console.log({token,userId})
                res.json({
                    token,
                    userId
                });
            }catch(err){
                res.sendStatus(401).json({Error:err});
            }
            
        } else {
            res.sendStatus(401);
        }
    }

    verifyUserByEmail(req,res){
        this.userService.verifyUserByEmail(req.query.email)
        .then((result)=>{
            if(result.length>0){return res.json({check: "fail"})}
            else if(result.length===0){return res.json({check: "pass"})}
        })
    }

    fetchProfilePic(req,res){
        this.userService.fetchProfilePic(req.user.id)
        .then((result)=>{
            res.json({profilePic:result[0]});
        })
    }

    uploadProfilePic(req,res){
        this.userService.uploadProfilePic(req.user.id,req.body)
        .then((result)=>{
            res.json(result);
        })
    }
}