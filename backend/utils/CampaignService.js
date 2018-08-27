const moment = require("moment");

module.exports = class CampaignService {
  constructor(knex) {
    this.knex = knex;
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
      // console.log('getting Watchlisted Campaigns...ID: ', user_id);
      let query = this.knex('watchlists')
      .leftJoin('campaigns', 'watchlists.campaign_id', 'campaigns.id')
      .select('*')
      .where('watchlists.user_id', user_id);

      return query;
    }
  }

  postCampaign(newCampaign) {
    /* 
      any data pre-processing (trim, format, etc) belongs here
      VVVVVVVVVVVVVV
    */

    let action = this.knex("campaigns").insert({
      title: newCampaign.title,
      short_description: newCampaign.sd,
      project_photo: newCampaign.photo,
      video_url: newCampaign.url,
      long_description: newCampaign.ld,
      full_name: newCampaign.name,
      email: newCampaign.email,
      company_name: newCampaign.company_name,
      company_legal_form: newCampaign.company_legal_form,
      company_reg_id: newCampaign.company_reg_id,
      company_country: newCampaign.company_country,
      start_date: newCampaign.start_date,
      end_date: newCampaign.end_date,
      soft_cap: newCampaign.soft_cap,
      hard_cap: newCampaign.hard_cap,
      status: newCampaign.status,
      user_id: newCampaign.user_id,
      eth_address: newCampaign.eth_address,
      private_key: newCampaign.private_key,
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
        eth_address: campaign.eth_address,
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
};
