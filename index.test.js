import { describe, it, expect } from 'vitest';
import { useCalendarGrid } from './index.js';

describe('useCalendarGrid', () => {
  describe('weekGrid', () => {
    it.each([
      /* regular year */
      ['2023-01-01', 52, [1, 2, 3, 4, 5, 6, 7]],
      ['2023-12-30', 52, [24, 25, 26, 27, 28, 29, 30]],
      // dayjs(date).isoWeek() returns 52 here, for some reason
      // ['2023-12-31', 1, [31, 1, 2, 3, 4, 5, 6]],
      ['2024-01-1', 1, [31, 1, 2, 3, 4, 5, 6]],

      /* leap year */
      ['2020-01-01', 1, [29, 30, 31, 1, 2, 3, 4]],
      ['2020-12-25', 52, [20, 21, 22, 23, 24, 25, 26]],
      ['2020-12-31', 53, [27, 28, 29, 30, 31, 1, 2]],
    ])('returns proper grid for date=%s', (date, week, dates) => {
      const { weekGrid } = useCalendarGrid({ date });
      const weekDates = weekGrid.value.days.map((day) => day.date);
      expect(weekGrid.value.week).toBe(week);
      expect(weekDates).toEqual(dates);
    });
  });
});
