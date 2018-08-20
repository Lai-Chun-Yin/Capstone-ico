const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);
const cors = require('cors');
const authClass = require('./utils/auth');
const auth = authClass();

const CampaignService = require('./utils/CampaignService');

const UserRouter = require('./userRouter/UserRouter');
const UserService = require('./utils/UserService');

app.use(cors());
app.use(auth.initialize());
app.use(bodyParser.json());

let campaignService = new CampaignService(knex);
let userService = new UserService(knex);

app.use('/api',(new UserRouter(userService)).router());

app.listen(8080,() => console.log('listening on port 8080'))

(async () => {
  await campaignService.postCampaign({title: "Dafuq is this"});
})()
