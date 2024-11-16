// Helper function to calculate days left until travel
export const daysUntilTravel = (travelDate: string) => {
  const travelDateObj = new Date(travelDate);
  const currentDate = new Date();
  const timeDiff = travelDateObj.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysLeft;
};
