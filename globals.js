import { Buffer } from "buffer";

const VOXEET_KEY = "Il5q3dHwTt1742fEMYlTNA==";
const VOXEET_SECRET = "5Vs9XLhVMitjoK7JVHi8KJwh_E72Ve1w-br9AxbDSlk=";
const VOXEET_BASIC =
  "Basic " + Buffer.from(`${VOXEET_KEY}:${VOXEET_SECRET}`).toString("base64");

const voxeetTokenUrl = "https://session.voxeet.com/v1/oauth2/token";

const voxeetTokenParams = {
  method: "POST",
  headers: {
    Authorization: VOXEET_BASIC,
  },
  body: {
    grant_type: "client_credentials",
  },
};

export const getAccessToken = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(voxeetTokenUrl, voxeetTokenParams);
      const { access_token } = await response.json();
      resolve(access_token);
    } catch (error) {
      reject(error);
    }
  });
};
