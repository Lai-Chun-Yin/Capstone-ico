const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);
const cors = require('cors');
const authClass = require('./utils/auth');
const auth = authClass();

app.use(cors());
app.use(auth.initialize());
app.use(bodyParser.json());

// API Services & Routers
const CampaignRouter = require('./router/CampaignRouter');
const CampaignService = require('./utils/CampaignService');
const CommentRouter = require('./router/CommentRouter');
const CommentService = require('./utils/CommentService');
const TokenRouter = require('./router/TokenRouter');
const TokenService = require('./utils/TokenService');
const TransactionRouter = require('./router/TransactionRouter');
const TransactionService = require('./utils/TransactionService');
const WatchlistRouter = require('./router/WatchlistRouter');
const WatchlistService = require('./utils/WatchlistService');

const UserRouter = require('./router/UserRouter');
const UserService = require('./utils/UserService');

// Define route methods
let cas = new CampaignService(knex);
let cos = new CommentService(knex);
let tos = new TokenService(knex);
let trs = new TransactionService(knex);
let wls = new WatchlistService(knex);
let userService = new UserService(knex);
app.use('/api/campaign', (new CampaignRouter(cas)).router());
app.use('/api/comment', (new CommentRouter(cos)).router());
app.use('/api/token', auth.authenticate(), (new TokenRouter(tos)).router());
app.use('/api/transaction', (new TransactionRouter(trs)).router());
app.use('/api/watchlist', auth.authenticate(), (new WatchlistRouter(wls)).router());

app.use('/api', (new UserRouter(userService)).router());
require('./router/UploadRouter')(app);

app.listen(8080, () => console.log('listening on port 8080'));