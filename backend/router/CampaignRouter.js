const express = require('express');

module.exports = class CampaignRouter {
  constructor(campaignService) {
    this.campaignService = campaignService;
  }

  router() {
    let router = express.Router();
    router.get('/', this.get.bind(this));
    router.get('/watchlist', this.getWatchlistedCampaigns.bind(this));
    router.get('/:cid', this.get.bind(this));
    router.post('/', this.post.bind(this));
    router.put('/:cid', this.put.bind(this));
    router.delete('/:cid', this.delete.bind(this));

    return router;
  }

  get(req, res) {
    // console.log("USER object:", req.user);
    return this.campaignService.getCampaign(req.params.cid)
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  getWatchlistedCampaigns(req, res) {
    return this.campaignService.getCampaign(null, req.user.id)
    .then(results => {
      res.json(results);
      // console.log("getWatchlistedCampaigns results...", results);
    })
    .catch(err => res.status(500).json(err));
  }

  post(req, res) {
    return this.campaignService.postCampaign(req.body,req.user.id)
    .then(() => this.campaignService.getCampaign())
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  put(req, res) {
    return this.campaignService.putCampaign(req.body,req.params.cid)
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