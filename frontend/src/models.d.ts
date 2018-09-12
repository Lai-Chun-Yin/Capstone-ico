declare namespace CapstoneICO {
  interface ICampaign {
    id: number;
    title: string;
    short_description: string;
    project_photo: string;
    video_url: string;
    long_description: string;
    full_name: string;
    email: string;
    company_name: string;
    company_legal_form: string;
    company_reg_id: string;
    company_country: string;
    start_date: Date;
    end_date: Date;
    soft_cap: number;
    hard_cap: number;
    token_name: string;
    token_symbol: string;
    conversion_ratio: number;
    status: string;
    user_id: number;
    eth_address: string;
    token_address: string;
    total_supply: number;
    decimal_places: number;
    private_key: string;
    token_id: number;
    created_at: Date;
    updated_at: Date;
  }

  interface ITransaction {
    id: number;
    date: Date;
    amount: number;
    tx_hash: string;
    user_id: number;
    campaign_id: number;
  }

  interface IToken {
    id: number;
    user_id: number;
    type: string;
    distributed: boolean;
    name: string;
    symbol: string;
    campaign_id: number;
    token_contract: string;
    total_supply: number;
    token_decimal_place: number;
    receive_address: string;
    created_at: Date;
    updated_at: Date;
  }

  interface IWatchlist {
    id: number;
    user_id: number;
    campaign_id: number;
  }

  interface IComment {
    alias: string;
    campaign_id: number;
    content: string;
    date: string;
  }
}
