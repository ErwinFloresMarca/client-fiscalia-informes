import { parseTime } from '@/filters';

export const generateRangeDates = (daysAgo) => {
  const arrResult = [];
  const days = [];
  const startDay = new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
  let endDay = new Date(startDay.getTime());
  endDay.setDate(endDay.getDate() + 1);
  endDay = new Date(endDay.getTime() - 1);
  while (daysAgo--) {
    arrResult.push([
      startDay.toISOString(),
      endDay.toISOString(),
    ]);
    days.push(parseTime(startDay, '{a}'));
    startDay.setDate(startDay.getDate() - 1);
    endDay.setDate(endDay.getDate() - 1);
  }
  return {
    ranges: arrResult.reverse(),
    days: days.reverse(),
  };
};
