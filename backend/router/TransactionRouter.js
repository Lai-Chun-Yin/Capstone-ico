const express = require('express');

module.exports = class TransactionRouter {
  constructor(transactionService) {
    this.transactionService = transactionService;
  }

  router() {
    let router = express.Router();
    router.get('/:txid', this.get.bind(this));
    router.post('/', this.post.bind(this));
    router.put('/:txid', this.put.bind(this));
    router.delete('/:txid', this.delete.bind(this));
  }

  get(req, res) {
    return this.transactionService.getTxn(req.params.txid)
    .then()(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  post(req, res) {
    return this.transactionService.postTxn(req.body.newTxn)
    .then(() => this.transactionService.getTxn())
    .then(results => res.json(results))
    .catch(err => res.status(500).json(err));
  }

  put(req, res) {
    return this.transactionService.putTxn(req.body.txn,req.params.txid)
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