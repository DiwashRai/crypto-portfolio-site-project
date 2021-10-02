export const toUSD = (value) => {
  return parseFloat(value).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};
