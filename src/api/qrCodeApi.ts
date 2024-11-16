import apiClient from ".";

const baseURL = "http://localhost:8080/qrcode";

const getQrCodes = () => {
  return apiClient.get(baseURL);
};

export default {
  getQrCodes,
};
