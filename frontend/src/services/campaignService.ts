import http from "./httpService";

export function getCampaign(campaignId: number) {
  const apiEndpoint = `${
    process.env.REACT_APP_API_SERVER
  }/api/campaign/${campaignId}`;

  return http.get(apiEndpoint);
}

export function getCampaignBalance(campaignId: number | null) {
  let apiEndpoint;
  if (campaignId) {
    apiEndpoint = `${
      process.env.REACT_APP_API_SERVER
    }/api/transaction/balance/${campaignId}`;
  } else {
    apiEndpoint = `${process.env.REACT_APP_API_SERVER}/api/transaction/balance`;
  }

  return http.get(apiEndpoint);
}
