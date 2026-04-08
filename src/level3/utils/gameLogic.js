export const calculateScore = (baseScore, timeTaken, mistakes) => {
  const timeBonus = Math.max(0, 100 - timeTaken);
  const mistakePenalty = mistakes * 20;
  const finalScore = baseScore + timeBonus - mistakePenalty;
  return Math.max(0, finalScore);
};
