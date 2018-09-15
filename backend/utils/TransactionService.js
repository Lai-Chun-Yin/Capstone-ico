const moment = require('moment');

module.exports = class TransactionService {
  constructor(knex) {
    this.knex = knex;
  }

  getBackersCount(campaign_id) {
    // return sum of supporters grouped by campaign
    if (campaign_id) {  // for one user
      let query = this.knex('transactions').select('campaign_id').countDistinct('user_id').where('campaign_id',campaign_id).groupBy('campaign_id');

      return query;
    } else {  // for all users
      let query = this.knex('transactions').select('campaign_id').countDistinct('user_id').groupBy('campaign_id');

      return query;
    }
  }

  getCampaignBalance(campaign_id) {
    // return sum of Eth grouped by campaign
    if (campaign_id) {  // for one user
      let query = this.knex('transactions').select('campaign_id').sum('amount').where('campaign_id',campaign_id).groupBy('campaign_id');

      return query;
    } else {  // for all users
      let query = this.knex('transactions').select('campaign_id').sum('amount').groupBy('campaign_id');

      return query;
    }
  }

  getTxn(user_id) {
    if (user_id) {   // return user's transactions
      let query = this.knex
        .select()
        .from('transactions')
        .where('user_id',user_id);
      
      return query;
    } else {      // return all transactions
      let query = this.knex.select().from('transactions');

      return query;
    }
  }

  postTxn(newTxn) {
    /* 
      any data pre-processing (trim, format, etc) belongs here
      VVVVVVVVVVVVVV
    */

    let action = this.knex('transactions').insert({
      date: newTxn.date,
      amount: newTxn.amount,
      tx_hash: newTxn.txHash,
      user_id: newTxn.user_id,
      campaign_id: newTxn.campaignId
    })

    return action;
  }
  
  putTxn(txn, txid) {
    /* 
      any data pre-processing (trim, format, etc) belongs here
      VVVVVVVVVVVVVV
    */

    let action = this.knex('transactions')
      .where('id', txid)
      .update({
        date: txn.date,
        amount: txn.amount,
        tx_hash: txn.tx_hash,
        user_id: txn.user_id,
        campaign_id: txn.campaign_id
      });
    
      return action;
  }

  deleteTxn(txid) {
    let action = this.knex('transactions')
      .where('id', txid)
      .del();
    return action;
  }
}