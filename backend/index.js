const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const knexConfig = require('./knexfile').development;
const knex = require('knex')(knexConfig);

const CampaignService = require('./utils/CampaignService');
let campaignService = new CampaignService(knex);

(async () => {
  await campaignService.postCampaign({title: "Dafuq is this"});
})()
