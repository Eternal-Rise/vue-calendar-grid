import { computed, ref } from 'vue';
import dayjs from 'dayjs/esm/index';
import isLeapYear from 'dayjs/esm/plugin/isLeapYear';
import isoWeek from 'dayjs/esm/plugin/isoWeek';
import isoWeeksInYear from 'dayjs/esm/plugin/isoWeeksInYear';
import localeData from 'dayjs/esm/plugin/localeData';
import weekOfYear from 'dayjs/esm/plugin/weekOfYear';

dayjs.extend(isLeapYear);
dayjs.extend(isoWeek);
dayjs.extend(isoWeeksInYear);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);

const getWeekGrid = (date) => {
  const startDate = dayjs(date).startOf('isoWeek');
  const week = startDate.isoWeek();
  const days = [];

  for (let i = 0; i < 7; i++) {
    const date = startDate.add(i, 'day');
    days.push({
      date: date.date(),
      dateString: date.format('YYYY-MM-DD'),
    });
  }

  return { week, days };
};

export const useCalendarGrid = (defaultValues = {}) => {
  const date = ref(defaultValues.date ?? new Date());

  const weekdays = computed(() => {
    return dayjs.weekdays();
  });

  const weekGrid = computed(() => getWeekGrid(date.value));

  return {
    date,
    weekdays,
    weekGrid,
  };
};
