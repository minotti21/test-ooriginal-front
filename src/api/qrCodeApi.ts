import apiClient from ".";

const baseURL = "https://qrcode-api-554937473875.southamerica-east1.run.app/qrcode";

const getQrCodes = () => {
  return apiClient.get(baseURL);
};

export default {
  getQrCodes,
};
