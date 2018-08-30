const express = require('express');

module.exports = class WatchlistRouter {
  constructor(watchlistService) {
    this.watchlistService = watchlistService;
  }

  router() {
    let router = express.Router();
    router.get('/', this.get.bind(this));
    router.post('/', this.post.bind(this));
    router.delete('/:cid', this.delete.bind(this));

    return router;
  }

  get(req, res) {
    return this.watchlistService.getWatchlist(req.user.id)
      .then(results => res.json(results))
      .catch(err => res.status(500).json(err));
  }

  async post(req, res) {
    try {
      let checkDuplicate = await this.watchlistService.getWatchlist(req.user.id, req.body.campaign_id);
      if (checkDuplicate.length) {
        throw ('Campaign already added to watchlist.')
      }
      return this.watchlistService.postWatchlist(req.user.id, req.body)
        .then(() => this.watchlistService.getWatchlist())
        .then(results => res.json(results))
        .catch(err => res.status(500).json(err));
    } catch (err) {
      console.log('WatchlistRouter.post Error: ', err);
    }
  }

  delete(req, res) {
    return this.watchlistService.deleteWatchlist(req.user.id, req.params.cid)
      .then(() => this.watchlistService.getWatchlist())
      .then(results => res.json(results))
      .catch(err => res.status(500).json(err));
  }
}