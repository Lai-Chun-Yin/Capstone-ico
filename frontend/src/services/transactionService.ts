import http from "./httpService";

const apiEndpoint = `${process.env.REACT_APP_API_SERVER}/api/transaction`;

export function postTransaction(
  date: string,
  amount: number,
  txHash: string,
  campaignId: number,
  token: string | null
) {
  const requestBody = { date, amount, txHash, campaignId };

  const auth = { headers: { Authorization: `Bearer ${token}` } };

  return http.post(apiEndpoint, requestBody, auth);
}
