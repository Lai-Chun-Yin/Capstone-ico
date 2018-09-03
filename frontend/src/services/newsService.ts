import http from "./httpService";

const apiEndpoint =
  "https://newsapi.org/v2/everything?sources=crypto-coins-news&apiKey=9955ba9b0a244c069c25d2445a1ac3ff";

export function getNews() {
  return http.get(apiEndpoint);
}
