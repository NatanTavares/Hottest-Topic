const MAX_ID = 493;

export const getRandomOptions = (notThisOne?: number): number => {
  const optionsNumber = Math.floor(Math.random() * MAX_ID) + 1;

  if (optionsNumber !== notThisOne) return optionsNumber;
  return getRandomOptions(notThisOne);
};

export const getOptionsForVote = () => {
  const firstId = getRandomOptions();
  const secondId = getRandomOptions(firstId);

  return [firstId, secondId];
};
