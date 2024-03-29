import { computed, ref } from 'vue';
import dayjs from 'dayjs/esm/index';
import isLeapYear from 'dayjs/esm/plugin/isLeapYear';
import isoWeek from 'dayjs/esm/plugin/isoWeek';
import isoWeeksInYear from 'dayjs/esm/plugin/isoWeeksInYear';
import localeData from 'dayjs/esm/plugin/localeData';
import weekOfYear from 'dayjs/esm/plugin/weekOfYear';
import updateLocale from 'dayjs/esm/plugin/updateLocale';

dayjs.extend(isLeapYear);
dayjs.extend(isoWeek);
dayjs.extend(isoWeeksInYear);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(updateLocale);

export const useCalendarGrid = (defaultValues = {}) => {
  const weekStart = ref(1);
  const dateFormat = defaultValues.dateFormat ?? 'YYYY-MM-DD';
  const date = ref(dayjs(defaultValues.date).format(dateFormat));

  const weekdays = computed(() => {
    const daysNames = dayjs.weekdays();
    const days = [];

    let day = weekStart.value;
    for (let i = 0; i < 7; i += 1) {
      days.push(daysNames[day]);
      day += 1;
      if (day > 6) day = 0;
    }

    return days;
  });

  const months = computed(() => dayjs.months());

  /**
   * use `weekStart` inside `computed` to mimic `watch` behavior,
   * but compute grid lazily
   */
  const weekGrid = computed(() => (weekStart.value, getWeekGrid(date.value)));
  const monthGrid = computed(() => (weekStart.value, getMonthGrid(date.value)));
  const yearGrid = computed(() => (weekStart.value, getYearGrid(date.value)));

  const getWeekGrid = (date) => {
    const startDate = dayjs(date).startOf('week');
    const week = startDate.week();
    const days = [];

    for (let i = 0; i < 7; i++) {
      const date = startDate.add(i, 'day');
      days.push({
        date: date.date(),
        dateString: date.format(dateFormat),
      });
    }

    return { week, days };
  };

  const getMonthGrid = (date) => {
    date = dayjs(date).startOf('month');
    const grid = [];

    for (let i = 0; i < 6; i++) {
      grid.push(getWeekGrid(date.add(i, 'week')));
    }

    return grid;
  };

  const getYearGrid = (date) => {
    date = dayjs(date).startOf('year');
    const grid = [];

    for (let i = 0; i < 12; i++) {
      grid.push(getMonthGrid(date.add(i, 'month')));
    }

    return grid;
  };

  const setDate = (date) => {
    date.value = dayjs(date).format(dateFormat);
  };

  const nextMonth = () => {
    date.value = dayjs(date.value).add(1, 'month').format(dateFormat);
  };

  const prevMonth = () => {
    date.value = dayjs(date.value).subtract(1, 'month').format(dateFormat);
  };

  const nextYear = () => {
    date.value = dayjs(date.value).add(1, 'year').format(dateFormat);
  };

  const prevYear = () => {
    date.value = dayjs(date.value).subtract(1, 'year').format(dateFormat);
  };

  const setWeekStart = (n) => {
    weekStart.value = n > 6 ? 6 : n < 0 ? 0 : n;
    dayjs.updateLocale(dayjs.locale(), { weekStart: weekStart.value });
  };

  setWeekStart(defaultValues.weekStart ?? 1);

  return {
    date,
    weekdays,
    months,
    weekGrid,
    monthGrid,
    yearGrid,
    setDate,
    nextMonth,
    prevMonth,
    nextYear,
    prevYear,
    setWeekStart,
  };
};
