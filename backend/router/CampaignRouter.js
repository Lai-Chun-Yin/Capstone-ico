const express = require('express');

module.exports = class CampaignRouter {
  constructor(campaignService) {
    this.campaignService = campaignService;
  }

  router() {
    let router = express.Router();
    router.get('/:cid', this.get.bind(this));
    router.post('/', this.post.bind(this));
    router.put('/:cid', this.put.bind(this));
    router.delete('/:cid', this.delete.bind(this));
  }

  get(req, res) {
    return this.campaignService.getCampaign(req.params.cid)
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  post(req, res) {
    return this.campaignService.postCampaign(req.body.newCampaign)
    .then(() => this.campaignService.getCampaign())
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  put(req, res) {
    return this.campaignService.putCampaign(req.body.campaign,req.params.cid)
    .then(() => this.campaignService.getCampaign())
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  delete(req, res) {
    return this.campaignService.deleteCampaign(req.params.cid)
    .then(() => this.campaignService.getCampaign())
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }
}