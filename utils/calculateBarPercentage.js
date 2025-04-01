export const calculateBarPercentage = (target, amountCollected) => {
  const percentage = Math.round((amountCollected * 100) / target);
  return percentage;
}; 