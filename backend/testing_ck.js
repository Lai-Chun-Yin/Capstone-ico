const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);

const CampaignService = require('./utils/CampaignService');
const WatchlistService = require('./utils/WatchlistService');
const TransactionService = require('./utils/TransactionService');
let campaignService = new CampaignService(knex);
let watchlistService = new WatchlistService(knex);


(async () => {
  let result;
  // result = await campaignService.postCampaign({title: "Dafuq is this"});
  // result = await campaignService.getCampaign(1);
  // result = await campaignService.putCampaign(campaign,1);
  result = await watchlistService.getWatchlist(3);
  if (result) {
    console.log('result:', result);
    console.log('result.length:', result.length);
  }
})()
