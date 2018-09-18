const moment = require("moment");
const Provider = require('../provider');

const Web3 = require("web3");
const web3 = new Web3(Provider);

module.exports = class CampaignService {
  constructor(knex) {
    this.knex = knex;
  }

  searchCampaign(search) {
    if (search) {
      const searchWord = decodeURI(search).toLowerCase();
      let query = this.knex('campaigns')
        .where(this.knex.raw("LOWER(title) LIKE ?", `%${searchWord}%`))
        .orWhere(this.knex.raw("LOWER(short_description) LIKE ?", `%${searchWord}%`))
        .orWhere(this.knex.raw("LOWER(long_description) LIKE ?", `%${searchWord}%`));

      return query;
    } else {
      let query = this.knex('campaigns');

      return query;
    }
  }

  getCampaign(cid, user_id) {
    if (!user_id) {
      if (cid) {
        // return specific campaigns
        let query = this.knex
          .select()
          .from("campaigns")
          .where("id", cid);

        return query;
      } else {
        // return all campaigns
        let query = this.knex.select().from("campaigns");

        return query;
      }
    } else {
      // return campaigns in watchlist (of particular user)
      let query = this.knex('watchlists')
        .leftJoin('campaigns', 'watchlists.campaign_id', 'campaigns.id')
        .select('*')
        .where('watchlists.user_id', user_id);

      return query;
    }
  }

  getByCreator(user_id){
    let query = this.knex.select()
      .from('campaigns')
      .where("user_id", user_id);

      return query;
  }

  getBySupporter(user_id){
    let query = this.knex.from('campaigns')
    .innerJoin('transactions','campaigns.id','transactions.campaign_id')
    .where('transactions.user_id',user_id);
    // let query = this.knex.with('support',this.knex.raw(`SELECT campaign_id from (SELECT user_id, campaign_id FROM transactions WHERE user_id=${user_id}) GROUP BY campaign_id`))
    //   .select('*').from('campaigns').innerJoin('support','campaigns.id','support.campaign_id');
      
    return query;
  }

  async postCampaign(newCampaign, user_id) {
    // create new Eth account from HDwallet
    const newAccount = await web3.eth.accounts.create();
    const keystore = newAccount.encrypt('passcode');  // encrypt ---> generate keystore
    const keystoreString = JSON.stringify(keystore);
    // console.log(newAccount);
    // console.log(keystore);

    let action = this.knex("campaigns").insert({
      title: newCampaign.campaignName,
      short_description: newCampaign.shortDescription,
      project_photo: newCampaign.imageFile,
      video_url: newCampaign.video,
      long_description: newCampaign.longDescription,
      full_name: newCampaign.fullName,
      email: newCampaign.email,
      company_name: newCampaign.companyName,
      company_legal_form: newCampaign.legalForm,
      company_reg_id: newCampaign.regId,
      company_country: newCampaign.country,
      start_date: newCampaign.startDate,
      end_date: newCampaign.endDate,
      soft_cap: newCampaign.softCap,
      hard_cap: newCampaign.hardCap,
      total_supply: newCampaign.totalSupply,
      token_name: newCampaign.tokenName,
      decimal_places: newCampaign.decimalPlaces,
      token_symbol: newCampaign.tokenSymbol,
      conversion_ratio: newCampaign.conversionRatio,
      status: "pending",
      user_id: user_id,
      eth_address: newCampaign.eth_address,
      token_address: newAccount.address,  // address generated above
      keystore: keystoreString,   // keystore encrypted from private key from above
      token_id: newCampaign.token_id
    });
    return action;
  }

  putCampaign(campaign, cid) {
    /* 
      any data pre-processing (trim, format, etc) belongs here
      VVVVVVVVVVVVVV
    */

    let action = this.knex("campaigns")
      .where("id", cid)
      .update({
        title: campaign.title,
        short_description: campaign.sd,
        project_photo: campaign.photo,
        video_url: campaign.url,
        long_description: campaign.ld,
        full_name: campaign.name,
        email: campaign.email,
        company_name: campaign.company_name,
        company_legal_form: campaign.company_legal_form,
        company_reg_id: campaign.company_reg_id,
        company_country: campaign.company_country,
        start_date: campaign.start_date,
        end_date: campaign.end_date,
        soft_cap: campaign.soft_cap,
        hard_cap: campaign.hard_cap,
        status: campaign.status,
        user_id: campaign.user_id,
        eth_address: newCampaign.eth_address,
        token_address: newCampaign.token_address,
        private_key: campaign.private_key,
        token_id: campaign.token_id
      });
    return action;
  }

  deleteCampaign(cid) {
    let action = this.knex("campaigns")
      .where("id", cid)
      .del();
    return action;
  }

  getPending(userId) {
    let query = this.knex.select().from("campaigns")
      .where("status", "pending");
    let checkAdmin = this.knex.select("is_admin").from("users")
      .where("id", userId);
    return Promise.all([query, checkAdmin]);
  }

  async approveCampaign(campaignId, userId) {
    let checkAdmin = await this.knex.select("is_admin").from("users")
      .where("id", userId);
    if (checkAdmin[0].is_admin === false) { return Promise.resolve({error:"Not Admin"}); }
    let action = this.knex("campaigns")
      .where("id", campaignId)
      .update({
        status: "approved"
      });
    return action;
  }
};
