const express = require('express');

module.exports = class WatchlistRouter {
  constructor(watchlistService) {
    this.watchlistService = watchlistService;
  }

  router() {
    let router = express.Router();
    router.get('/', this.get.bind(this));
    router.get('/:wid', this.get.bind(this));
    router.post('/', this.post.bind(this));
    router.put('/:wid', this.put.bind(this));
    router.delete('/:wid', this.delete.bind(this));

    return router;
  }

  get(req, res) {
    return this.watchlistService.getWatchlist(req.params.wid)
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  post(req, res) {
    return this.watchlistService.postWatchlist(req.body)
    .then(() => this.watchlistService.getWatchlist())
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  put(req, res) {
    return this.watchlistService.putWatchlist(req.body,req.params.wid)
    .then(() => this.watchlistService.getWatchlist())
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  delete(req, res) {
    return this.watchlistService.deleteWatchlist(req.params.wid)
    .then(() => this.watchlistService.getWatchlist())
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }
}