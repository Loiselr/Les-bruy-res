import axios from 'axios';

/*
const testingUrl = 'https://strapi-store-server.onrender.com/api';
export const customFetch = axios.create({
  baseURL: testingUrl,
});
*/

const productionUrl = 'https://les-bruyeres.onrender.com';
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
