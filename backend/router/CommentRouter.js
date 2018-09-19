const express = require("express");
const authClass = require("../utils/auth");
const auth = authClass();

module.exports = class CommentRouter {
  constructor(commentService) {
    this.commentService = commentService;
  }

  router() {
    let router = express.Router();
    router.get('/', this.get.bind(this));
    router.get("/campaign/:campaign_id", this.get.bind(this));
    router.post("/", auth.authenticate(), this.post.bind(this));
    router.put("/:co_id", this.put.bind(this));
    router.delete("/:co_id", this.delete.bind(this));

    return router;
  }

  get(req, res) {
    return this.commentService.getComment(req.params.campaign_id)
      .then(results => res.json(results))
      .catch(err => res.status(500).json(err));
  }

  post(req, res) {
    return this.commentService
      .postComment(req.body)
      .then(() => this.commentService.getComment())
      .then(results => res.json(results))
      .catch(err => res.status(500).json(err));
  }

  put(req, res) {
    return this.commentService
      .putComment(req.body, req.params.co_id)
      .then(() => this.commentService.getComment())
      .then(results => res.json(results))
      .catch(err => res.status(500).json(err));
  }

  delete(req, res) {
    return this.commentService
      .deleteComment(req.params.co_id)
      .then(() => this.commentService.getComment())
      .then(results => res.json(results))
      .catch(err => res.status(500).json(err));
  }
};