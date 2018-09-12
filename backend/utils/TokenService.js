module.exports = class TokenService {
  constructor(knex) {
    this.knex = knex;
  }

  getToken(tid) {
    if (tid) {
      // return specific tokens
      let query = this.knex.select().from("tokens").where("id", tid);

      return query;
    } else {
      // return all tokens
      let query = this.knex.select().from("tokens");

      return query;
    }
  }

  postToken(newToken) {
    /* 
      any data pre-processing (trim, format, etc) belongs here
      VVVVVVVVVVVVVV
    */

    let action = this.knex("tokens").insert({
      user_id: newToken.user_id,
      type: newToken.type,
      distributed: false,
      name: newToken.name,
      symbol: newToken.symbol,
      campaign_id: newToken.campaign_id,
      token_contract: newToken.token_contract,
      total_supply: newToken.total_supply,
      token_decimal_place: newToken.decimal,
      receive_address: newToken.genesis_address
    }).returning('*');

    return action;
  }

  putToken(token, tid) {
    let action = this.knex("tokens")
      .where("id", tid)
      .update({
        user_id: token.user_id,
        type: token.type,
        distributed: token.distributed,
        name: token.name,
        symbol: token.symbol,
        campaign_id: token.campaign_id,
        token_contract: token.token_contract,
        total_supply: token.total_supply,
        token_decimal_place: token.token_decimal_place,
        receive_address: token.receive_address
      });

    return action;
  }

  deleteToken(tid) {
    let action = this.knex('tokens')
      .where('id',tid)
      .del();

    return action;
  }
};
