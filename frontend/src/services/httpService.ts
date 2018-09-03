import axios from "axios";
import logger from "./logService";

axios.interceptors.response.use(undefined, (error: any) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
  }
  return Promise.reject(error);
});

export default {
  delete: axios.delete,
  get: axios.get,
  post: axios.post,
  put: axios.put
};
