import http from "./httpService";

export function getCampaign(campaignId: number, token: string | null) {
  const apiEndpoint = `${
    process.env.REACT_APP_API_SERVER
  }/api/campaign/${campaignId}`;

  console.log(apiEndpoint);

  const customeHeader = { headers: { Authorization: `Bearer ${token}` } };

  return http.get(apiEndpoint, customeHeader);
}
