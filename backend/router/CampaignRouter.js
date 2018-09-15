const express = require('express');
const authClass = require('../utils/auth');
const auth = authClass();

module.exports = class CampaignRouter {
  constructor(campaignService) {
    this.campaignService = campaignService;
  }

  router() {
    let router = express.Router();
    router.get('/', this.get.bind(this));
    router.get('/search', this.searchCampaigns.bind(this));
    router.get('/watchlist', auth.authenticate(), this.getWatchlistedCampaigns.bind(this));
    router.get('/byCreator', auth.authenticate(),this.getByCreator.bind(this));
    router.get('/bySupporter',auth.authenticate(), this.getBySupporter.bind(this));
    router.get('/pending',auth.authenticate(),this.getPending.bind(this));
    router.get('/:cid', this.get.bind(this));
    router.post('/', auth.authenticate(), this.post.bind(this));
    router.put('/pending/approve/:cid',auth.authenticate(), this.approveCampaign.bind(this));
    router.put('/:cid', auth.authenticate(), this.put.bind(this));
    router.delete('/:cid', auth.authenticate(), this.delete.bind(this));

    return router;
  }

  searchCampaigns(req, res) {
    return this.campaignService.searchCampaign(req.query.keyword)
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
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

  getByCreator(req,res){
    return this.campaignService.getByCreator(req.user.id)
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  getBySupporter(req,res){
    return this.campaignService.getBySupporter(req.user.id)
    .then(results => {
      let onlyUnique = (value, index, self) => { 
        return self.findIndex(element => element.id === value.id)===index;
      }
      let uniqueData = results.filter(onlyUnique);
      res.json(uniqueData);
    })
    .catch(err => res.status(500).json(err));
  }

  getPending(req,res) {
    return this.campaignService.getPending(req.user.id)
    .then(values => {
      if(values[1][0].is_admain===false){res.status(400).send("Permission denied. Only admin can access.");return;}
      res.json(values[0]);
    }).catch(err => res.status(500).send(err.message));
  }

  post(req, res) {
    return this.campaignService.postCampaign(req.body,req.user.id)
    .then(() => this.campaignService.getCampaign())
    .then(results => res.json(results))
    .catch(err => {
      res.status(500).json(err);
      console.log(err);
    });
  }

  put(req, res) {
    return this.campaignService.putCampaign(req.body,req.params.cid)
    .then(() => this.campaignService.getCampaign())
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  approveCampaign(req,res){
    return this.campaignService.approveCampaign(req.params.cid,req.user.id)
    .then(results => {
      if(results.error === "Not Admin"){
        res.status(400).send("Permission denied. Only admin can access.");
        return;
      }
      res.json(results);
    })
    .catch(err => res.json(500).json(err));
  }

  delete(req, res) {
    return this.campaignService.deleteCampaign(req.params.cid)
    .then(() => this.campaignService.getCampaign())
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }
}