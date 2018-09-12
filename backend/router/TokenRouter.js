const express = require('express');
const deploy = require('../ethereum/deploy');

module.exports = class TokenRouter {
  constructor(tokenService) {
    this.tokenService = tokenService;
  }

  router() {
    let router = express.Router();
    router.get('/', this.get.bind(this));
    router.get('/:tid', this.get.bind(this));
    router.post('/deploy', this.deployContract.bind(this));
    router.post('/', this.post.bind(this));
    router.put('/:tid', this.put.bind(this));
    router.delete('/:tid', this.delete.bind(this));

    return router;
  }

  deployContract(req, res) {
    deploy(req.body).then(contractAddress => {    // token_contract undefined at this point
      req.body.token_contract = contractAddress;  // assign value to token_contract at this line
      req.body.user_id = req.user.id;
      return this.tokenService.postToken(req.body)
    })
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  get(req, res) {
    return this.tokenService.getToken(req.params.contract)
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  post(req, res) {
    return this.tokenService.postToken(req.body)
    .then(() => this.tokenService.getToken())
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  put(req, res) {
    return this.tokenService.putToken(req.body,req.params.tid)
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