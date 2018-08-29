module.exports = class WatchlistService {
  constructor(knex) {
    this.knex = knex;
  }

  getWatchlist(user_id, cid) {
    if (cid) {
      let query = this.knex
        .select()
        .from('watchlists')
        .where('campaign_id', cid)
        .andWhere('user_id', user_id);

      return query;
    } else {
      let query = this.knex
        .select()
        .from('watchlists')
        .where('user_id', user_id);

      return query;
    }
  }

  postWatchlist(user_id, newWatchlist) {
    /* 
      any data pre-processing (trim, format, etc) belongs here
      VVVVVVVVVVVVVV
    */

    let action = this.knex('watchlists').insert({
      user_id: user_id,
      campaign_id: newWatchlist.campaign_id
    });

    return action;
  }

  deleteWatchlist(user_id, cid) {
    let action = this.knex('watchlists')
      .where('campaign_id', cid)
      .andWhere('user_id', user_id)
      .del();
      
    return action;
  }
};