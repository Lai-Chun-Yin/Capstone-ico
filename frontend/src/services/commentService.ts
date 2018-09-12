import http from "./httpService";

const apiEndpoint = `${process.env.REACT_APP_API_SERVER}/api/comment`;

export function postCommentBackend(
  userId: number,
  content: string,
  date: string,
  campaignId: number,
  token: string | null
) {
  const requestBody = { userId, content, date, campaignId };

  const auth = { headers: { Authorization: `Bearer ${token}` } };

  return http.post(apiEndpoint, requestBody, auth);
}
