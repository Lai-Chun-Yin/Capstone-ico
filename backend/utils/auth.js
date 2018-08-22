const passport = require('passport');
const passportJWT = require('passport-jwt');
const knexConfig = require('../knexfile').development;
const knex = require('knex')(knexConfig);
require('dotenv').config();

const ExtractJwt = passportJWT.ExtractJwt;
const UserService = require('./UserService');
let userService = new UserService(knex);

module.exports = ()=>{
    const localStrategy = new passportJWT.Strategy({
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },async (payload,done)=>{
        try{
            const user = await userService.verifyUser(payload.id);
            if (user) {
                return done(null, {id: payload.id,is_admin: payload.is_admin});
            } else {
                throw new Error("User not found");
            }
        }catch(err){
            return done(err, null);
        }
    });
    passport.use(localStrategy);

    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", {session:false});
        }
    };
}