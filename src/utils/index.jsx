import axios from 'axios';
import {apiBaseUrl} from "./config.vite.js"

/*
const testingUrl = 'https://strapi-store-server.onrender.com/api';
export const customFetch = axios.create({
  baseURL: testingUrl,
});
*/

const productionUrl = `${apiBaseUrl}`;
export const customFetch = axios.create({
  baseURL: productionUrl,
});


export const generateAmountOptions = (number) => {
  return Array.from({ length: number }, (_, index) => {
    const amount = index + 1;
    return (
      <option key={amount} value={amount}>
        {amount}
      </option>
    );
  });
};
