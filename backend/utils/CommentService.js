const moment = require("moment");

module.exports = class CommentService {
  constructor(knex) {
    this.knex = knex;
  }

  getComment(co_id) {
    if (co_id) {
      let query = this.knex
        .selct()
        .from('comments')
        .where('id',co_id);

    return query;
    } else {
      let query = this.knex.select().from('comments');

      return query;
    }
  }

  postComment(newComment) {
    /* 
      any data pre-processing (trim, format, etc) belongs here
      VVVVVVVVVVVVVV
    */

    let action = this.knex('comments').insert({
      user_id: newComment.user_id,
      content: newComment.content,
      date: newComment.date,
      campaign_id: newComment.campaign_id
    });

    return action;
  }

  putComment(comment, co_id) {
    /*
      any data pre-processing (trim, format, etc) belongs here
      VVVVVVVVVVVVVV
    */
    let action = this.knex('comments')
      .where('id', co_id)
      .update({
        user_id: comment.user_id,
        content: comment.content,
        date: comment.date,
        campaign_id: comment.campaign_id
      });
    return action;
  }

  deleteComment(co_id) {
    let action = this.knex('comments')
      .where('id', co_id)
      .del();
    return action;
  }
};