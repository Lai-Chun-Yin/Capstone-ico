const passport = require('passport');
const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
require('dotenv').config();

const s3 = new AWS.S3({
    signatureVersion: 'v4',
    region: 'ap-northeast-2',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SESSION_TOKEN
});

module.exports = app => {
    app.get('/api/upload',passport.authenticate('jwt', { session: false }),(req,res)=>{
        const key = `${req.user.id}/${uuid()}.${req.query.fileType}`;
        s3.getSignedUrl('putObject',{
            Bucket: 'capstone-ico',
            ContentType: `image/${req.query.fileType}`,
            Key: key
        },(err,url)=>res.send({key,url}))
    })
}