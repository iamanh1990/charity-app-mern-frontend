import axios from 'axios';

export const createConnectAccount = async () => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-connect-account`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const getAccountStatus = async () => {
  return await axios.post(
    `${process.env.REACT_APP_API}/get-account-status`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const getAccountBalance = async () => {
  return await axios.post(
    `${process.env.REACT_APP_API}/get-account-balance`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const payoutSetting = async () => {
  return await axios.post(
    `${process.env.REACT_APP_API}/payout-setting`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const currencyFormatter = (data) => {
  return (data.amount / 100).toLocaleString(data.currency, {
    style: 'currency',
    currency: data.currency,
  });
};
