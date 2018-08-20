const moment = require("moment");

module.exports = class CampaignService {
  constructor(knex) {
    this.knex = knex;
  }

  getCampaign(cid) {
    if (cid) {    // return specific campaigns
      let query = this.knex.select().from("campaigns")
        .where("id", cid);

      return query.then(rows => {
        return rows.map(r => console.log(r));
      });
    } else {     // return all campaigns
      let query = this.knex.select().from("campaigns");

      return query.then(rows => {
        return rows.map(r => console.log(r));
      });
    }
  }

  postCampaign(campaign) {
    /* 
      any data pre-processing (trim, format, etc) belongs here
      VVVVVVVVVVVVVV
    */

    let action = this.knex('campaigns').insert({
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

  putCampaign(campaign, cid) {
    /* 
      any data pre-processing (trim, format, etc) belongs here
      VVVVVVVVVVVVVV
    */

    let action = this.knex('campaigns').where('id', cid)
    .update({
      short_description: campaign.sd,
      project_photo: campaign.photo,
      video_url: campaign.url,
      long_description: campaign.ld,
      start_date: campaign.start_date,
      end_date: campaign.end_date,
      soft_cap: campaign.soft_cap,
      hard_cap: campaign.hard_cap,
      status: campaign.status
    });
    return action;
  }

  deleteCampaign(cid) {
    let action = this.knex('campaigns').where('id', cid).del();
    return action;
  }
};
