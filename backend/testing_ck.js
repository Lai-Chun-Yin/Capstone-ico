const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);

const CampaignService = require('./utils/CampaignService');
const TokenService = require('./utils/TokenService');
const TransactionService = require('./utils/TransactionService');
let campaignService = new CampaignService(knex);
let tokenService = new TokenService(knex);
let transactionService = new TransactionService(knex);

(async () => {
  let result;
  let campaign = { title: 'Suckers Campaign', sd: 'Moons and Lambos and Bottles' };
  // result = await campaignService.postCampaign({title: "Dafuq is this"});
  // result = await campaignService.getCampaign(1);
  // result = await campaignService.putCampaign(campaign,1);
  result = await transactionService.getTxn();
  console.log('result:', result);
})()
