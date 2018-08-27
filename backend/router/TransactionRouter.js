const express = require('express');

module.exports = class TransactionRouter {
  constructor(transactionService) {
    this.transactionService = transactionService;
  }

  router() {
    let router = express.Router();
    router.get('/', this.get.bind(this));
    // router.get('/:txid', this.get.bind(this));
    router.post('/', this.post.bind(this));
    router.put('/:txid', this.put.bind(this));
    router.delete('/:txid', this.delete.bind(this));

    return router;
  }

  get(req, res) {
    return this.transactionService.getTxn(req.user.id)
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  post(req, res) {
    return this.transactionService.postTxn(req.body)
    .then(() => this.transactionService.getTxn())
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
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