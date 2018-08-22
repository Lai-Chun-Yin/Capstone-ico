module.exports = class WatchlistService {
  constructor(knex) {
    this.knex = knex;
  }

  getWatchlist(co_id) {
    if (co_id) {
      let query = this.knex
        .select()
        .from('watchlists')
        .where('id',co_id);

    return query;
    } else {
      let query = this.knex.select().from('watchlists');

      return query;
    }
  }

  postWatchlist(newWatchlist) {
    /* 
      any data pre-processing (trim, format, etc) belongs here
      VVVVVVVVVVVVVV
    */

    let action = this.knex('watchlists').insert({
      user_id: newWatchlist.user_id,
      campaign_id: newWatchlist.campaign_id
    });

    return action;
  }

  putWatchlist(watchlist, co_id) {
    /*
      any data pre-processing (trim, format, etc) belongs here
      VVVVVVVVVVVVVV
    */
    let action = this.knex('watchlists')
      .where('id', co_id)
      .update({
        user_id: watchlist.user_id,
        campaign_id: watchlist.campaign_id
      });
    return action;
  }

  deleteWatchlist(co_id) {
    let action = this.knex('watchlists')
      .where('id', co_id)
      .del();
    return action;
  }
};