const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);
const cors = require('cors');
const authClass = require('./utils/auth');
const auth = authClass();

const CampaignService = require('./utils/CampaignService');

const UserRouter = require('./router/UserRouter');
const UserService = require('./utils/UserService');

app.use(cors());
app.use(auth.initialize());
app.use(bodyParser.json());

app.use('/api',(new UserRouter(userService)).router());

app.listen(8080,() => console.log('listening on port 8080'));


