const moment = require("moment");

module.exports = class CommentService {
  constructor(knex) {
    this.knex = knex;
  }

  getComment(campaign_id) {
    if (campaign_id) {
      let query = this.knex('comments')
      .join('users', 'comments.user_id', '=', 'users.id')
      .where("campaign_id", campaign_id)
      .select("alias","date","content")

      return query;
    }
    else{
      let query = this.knex('comments')
      .join('users', 'comments.user_id', '=', 'users.id')
      .select("alias","date","content", "campaign_id")

      return query;
    }
 
  }

  postComment(newComment) {
    /* 
      any data pre-processing (trim, format, etc) belongs here
      VVVVVVVVVVVVVV
    */

    let action = this.knex('comments').insert({
      user_id: newComment.userId,
      content: newComment.content,
      date: newComment.date,
      campaign_id: newComment.campaignId
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