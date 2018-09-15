const express = require('express');
const authClass = require('../utils/auth');
const auth = authClass();

module.exports = class TransactionRouter {
  constructor(transactionService) {
    this.transactionService = transactionService;
  }

  router() {
    let router = express.Router();
    // router.get('/', auth.authenticate(), this.get.bind(this));
    router.get('/backersCount/:cid', this.getBackersCount.bind(this));
    router.get('/balance', this.getBalance.bind(this));
    router.get('/:txid', auth.authenticate(), this.get.bind(this));
    router.get('/balance/:cid', this.getBalance.bind(this));
    router.post('/', auth.authenticate(), this.post.bind(this));
    router.put('/:txid', auth.authenticate(), this.put.bind(this));
    router.delete('/:txid', auth.authenticate(), this.delete.bind(this));

    return router;
  }

  get(req, res) {
    return this.transactionService.getTxn(req.user.id)
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  getBackersCount(req, res) {
    return this.transactionService.getBackersCount(req.params.cid)
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  getBalance(req, res) {
    return this.transactionService.getCampaignBalance(req.params.cid)
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  post(req, res) {
    req.body.user_id = req.user.id;
    return this.transactionService.postTxn(req.body)
    .then(() => this.transactionService.getTxn())
    .then(results => res.json(results))
    .catch(err => {
      console.log('POST transaction error',err);
      res.status(500).json(err);
    });
  }

  put(req, res) {
    return this.transactionService.putTxn(req.body,req.params.txid)
    .then(() => this.transactionService.getTxn())
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  delete(req, res) {
    return this.transactionService.deleteTxn(req.params.txid)
    .then(() => this.transactionService.getTxn())
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }
}