import http from "./httpService";

export function getCampaign(campaignId: number) {
  const apiEndpoint = `${
    process.env.REACT_APP_API_SERVER
  }/api/campaign/${campaignId}`;

  console.log(apiEndpoint);

  // const customeHeader = { headers: { Authorization: `Bearer ${token}` } };
  // return http.get(apiEndpoint, customeHeader);
  return http.get(apiEndpoint);
}

export function getCampaignBalance(campaignId: number | null) {
  let apiEndpoint;
  if (campaignId) {
    apiEndpoint = `${
      process.env.REACT_APP_API_SERVER
    }/api/transaction/balance/${campaignId}`;
  } else {
    apiEndpoint = `${
      process.env.REACT_APP_API_SERVER
    }/api/transaction/balance`;
  }

  console.log(apiEndpoint);

  return http.get(apiEndpoint);
}
