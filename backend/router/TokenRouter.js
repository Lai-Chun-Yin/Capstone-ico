const express = require('express');

module.exports = class TokenRouter {
  constructor(tokenService) {
    this.tokenService = tokenService;
  }

  router() {
    let router = express.Router();
    router.get('/:tid', this.get.bind(this));
    router.post('/', this.post.bind(this));
    router.put('/:tid', this.put.bind(this));
    router.delete('/:tid', this.delete.bind(this));
  }

  get(req, res) {
    return this.tokenService.getToken(req.params.tid)
    .then()(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  post(req, res) {
    return this.tokenService.postToken(req.body.newToken)
    .then(() => this.tokenService.getToken())
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  put(req, res) {
    return this.tokenService.putToken(req.body.token,req.params.tid)
    .then(() => this.tokenService.getToken())
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  delete(req, res) {
    return this.tokenService.deleteToken(req.params.tid)
    .then(() => this.tokenService.getToken())
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }
}