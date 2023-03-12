import { describe, it, expect } from 'vitest';
import { useCalendarGrid } from './index.js';

describe('useCalendarGrid', () => {
  describe('weekGrid', () => {
    it.each([
      /* regular year */
      ['2023-01-01', 52, [26, 27, 28, 29, 30, 31, 1]],
      ['2023-12-31', 52, [25, 26, 27, 28, 29, 30, 31]],

      /* leap year */
      ['2020-01-01', 1, [30, 31, 1, 2, 3, 4, 5]],
      ['2020-12-31', 53, [28, 29, 30, 31, 1, 2, 3]],
    ])('returns proper grid for date=%s', (date, week, dates) => {
      const { weekGrid } = useCalendarGrid({ date });
      const weekDates = weekGrid.value.days.map((day) => day.date);
      expect(weekGrid.value.week).toBe(week);
      expect(weekDates).toEqual(dates);
    });
  });
});
