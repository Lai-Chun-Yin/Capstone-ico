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

export function getCampaignsByCreator(){
  const token = localStorage.getItem("token");
  const apiEndpoint = `${process.env.REACT_APP_API_SERVER}/api/campaign/byCreator`;
  const header = { headers: { Authorization: `Bearer ${token}` } };

  return http.get(apiEndpoint,header);
}

export function getCampaignsBySupporter(){
  const token = localStorage.getItem("token");
  const apiEndpoint = `${process.env.REACT_APP_API_SERVER}/api/campaign/bySupporter`;
  const header = { headers: { Authorization: `Bearer ${token}` } };

  return http.get(apiEndpoint,header);
}
export function getBackersCount(campaignId: number | null){
  const apiEndpoint = `${process.env.REACT_APP_API_SERVER}/api/transaction/backersCount/${campaignId}`;
  return http.get(apiEndpoint);
}