import { describe, it, expect } from 'vitest';
import { useCalendarGrid } from './index.js';

const testWeekGrid = (weekGrid, week, dates) => {
  const weekDates = weekGrid.days.map((day) => day.date);
  expect(weekGrid.week).toBe(week);
  expect(weekDates).toEqual(dates);
};

const testMonthGrid = (monthGrid, expected) => {
  monthGrid.forEach((weekGrid, i) => {
    const { week, days } = expected[i];
    testWeekGrid(weekGrid, week, days);
  });
};

describe('useCalendarGrid', () => {
  describe('weekGrid', () => {
    it.each([
      // week starts on Sunday
      ['2020-01-01', 0, 1, [29, 30, 31, 1, 2, 3, 4]],
      ['2020-12-31', 0, 1, [27, 28, 29, 30, 31, 1, 2]],
      ['2021-01-01', 0, 1, [27, 28, 29, 30, 31, 1, 2]],
      ['2021-12-31', 0, 1, [26, 27, 28, 29, 30, 31, 1]],
      ['2022-01-01', 0, 1, [26, 27, 28, 29, 30, 31, 1]],
      ['2022-12-31', 0, 53, [25, 26, 27, 28, 29, 30, 31]],
      ['2023-01-01', 0, 1, [1, 2, 3, 4, 5, 6, 7]],
      ['2023-12-31', 0, 1, [31, 1, 2, 3, 4, 5, 6]],
      ['2024-01-01', 0, 1, [31, 1, 2, 3, 4, 5, 6]],
      ['2024-12-31', 0, 1, [29, 30, 31, 1, 2, 3, 4]],
      ['2025-01-01', 0, 1, [29, 30, 31, 1, 2, 3, 4]],
      ['2025-12-31', 0, 1, [28, 29, 30, 31, 1, 2, 3]],
      ['2026-01-01', 0, 1, [28, 29, 30, 31, 1, 2, 3]],
      ['2026-12-31', 0, 1, [27, 28, 29, 30, 31, 1, 2]],
      ['2027-01-01', 0, 1, [27, 28, 29, 30, 31, 1, 2]],
      ['2027-12-31', 0, 1, [26, 27, 28, 29, 30, 31, 1]],
      ['2028-01-01', 0, 1, [26, 27, 28, 29, 30, 31, 1]],
      ['2028-12-31', 0, 1, [31, 1, 2, 3, 4, 5, 6]],
      ['2029-01-01', 0, 1, [31, 1, 2, 3, 4, 5, 6]],
      ['2029-12-31', 0, 1, [30, 31, 1, 2, 3, 4, 5]],
      ['2030-01-01', 0, 1, [30, 31, 1, 2, 3, 4, 5]],
      ['2030-12-31', 0, 1, [29, 30, 31, 1, 2, 3, 4]],

      // week starts on Monday
      ['2020-01-01', 1, 1, [30, 31, 1, 2, 3, 4, 5]],
      ['2020-12-31', 1, 1, [28, 29, 30, 31, 1, 2, 3]],
      ['2021-01-01', 1, 1, [28, 29, 30, 31, 1, 2, 3]],
      ['2021-12-31', 1, 1, [27, 28, 29, 30, 31, 1, 2]],
      ['2022-01-01', 1, 1, [27, 28, 29, 30, 31, 1, 2]],
      ['2022-12-31', 1, 1, [26, 27, 28, 29, 30, 31, 1]],
      ['2023-01-01', 1, 1, [26, 27, 28, 29, 30, 31, 1]],
      ['2023-12-31', 1, 53, [25, 26, 27, 28, 29, 30, 31]],
      ['2024-01-01', 1, 1, [1, 2, 3, 4, 5, 6, 7]],
      ['2024-12-31', 1, 1, [30, 31, 1, 2, 3, 4, 5]],
      ['2025-01-01', 1, 1, [30, 31, 1, 2, 3, 4, 5]],
      ['2025-12-31', 1, 1, [29, 30, 31, 1, 2, 3, 4]],
      ['2026-01-01', 1, 1, [29, 30, 31, 1, 2, 3, 4]],
      ['2026-12-31', 1, 1, [28, 29, 30, 31, 1, 2, 3]],
      ['2027-01-01', 1, 1, [28, 29, 30, 31, 1, 2, 3]],
      ['2027-12-31', 1, 1, [27, 28, 29, 30, 31, 1, 2]],
      ['2028-01-01', 1, 1, [27, 28, 29, 30, 31, 1, 2]],
      ['2028-12-31', 1, 53, [25, 26, 27, 28, 29, 30, 31]],
      ['2029-01-01', 1, 1, [1, 2, 3, 4, 5, 6, 7]],
      ['2029-12-31', 1, 1, [31, 1, 2, 3, 4, 5, 6]],
      ['2030-01-01', 1, 1, [31, 1, 2, 3, 4, 5, 6]],
      ['2030-12-31', 1, 1, [30, 31, 1, 2, 3, 4, 5]],

      // week starts on Saturday
      ['2020-01-01', 6, 1, [28, 29, 30, 31, 1, 2, 3]],
      ['2020-12-31', 6, 1, [26, 27, 28, 29, 30, 31, 1]],
      ['2021-01-01', 6, 1, [26, 27, 28, 29, 30, 31, 1]],
      ['2021-12-31', 6, 53, [25, 26, 27, 28, 29, 30, 31]],
      ['2022-01-01', 6, 1, [1, 2, 3, 4, 5, 6, 7]],
      ['2022-12-31', 6, 1, [31, 1, 2, 3, 4, 5, 6]],
      ['2023-01-01', 6, 1, [31, 1, 2, 3, 4, 5, 6]],
      ['2023-12-31', 6, 1, [30, 31, 1, 2, 3, 4, 5]],
      ['2024-01-01', 6, 1, [30, 31, 1, 2, 3, 4, 5]],
      ['2024-12-31', 6, 1, [28, 29, 30, 31, 1, 2, 3]],
      ['2025-01-01', 6, 1, [28, 29, 30, 31, 1, 2, 3]],
      ['2025-12-31', 6, 1, [27, 28, 29, 30, 31, 1, 2]],
      ['2026-01-01', 6, 1, [27, 28, 29, 30, 31, 1, 2]],
      ['2026-12-31', 6, 1, [26, 27, 28, 29, 30, 31, 1]],
      ['2027-01-01', 6, 1, [26, 27, 28, 29, 30, 31, 1]],
      ['2027-12-31', 6, 53, [25, 26, 27, 28, 29, 30, 31]],
      ['2028-01-01', 6, 1, [1, 2, 3, 4, 5, 6, 7]],
      ['2028-12-31', 6, 1, [30, 31, 1, 2, 3, 4, 5]],
      ['2029-01-01', 6, 1, [30, 31, 1, 2, 3, 4, 5]],
      ['2029-12-31', 6, 1, [29, 30, 31, 1, 2, 3, 4]],
      ['2030-01-01', 6, 1, [29, 30, 31, 1, 2, 3, 4]],
      ['2030-12-31', 6, 1, [28, 29, 30, 31, 1, 2, 3]],
    ])(
      'returns proper grid for %s where week starts on %i',
      (date, weekStart, week, dates) => {
        const { weekGrid } = useCalendarGrid({ date, weekStart });
        testWeekGrid(weekGrid.value, week, dates);
      },
    );
  });

  describe('monthGrid', () => {
    it.each([
      [
        '2020-01-01',
        [
          { week: 1, days: [30, 31, 1, 2, 3, 4, 5] },
          { week: 2, days: [6, 7, 8, 9, 10, 11, 12] },
          { week: 3, days: [13, 14, 15, 16, 17, 18, 19] },
          { week: 4, days: [20, 21, 22, 23, 24, 25, 26] },
          { week: 5, days: [27, 28, 29, 30, 31, 1, 2] },
          { week: 6, days: [3, 4, 5, 6, 7, 8, 9] },
        ],
      ],
      [
        '2020-12-31',
        [
          { week: 49, days: [30, 1, 2, 3, 4, 5, 6] },
          { week: 50, days: [7, 8, 9, 10, 11, 12, 13] },
          { week: 51, days: [14, 15, 16, 17, 18, 19, 20] },
          { week: 52, days: [21, 22, 23, 24, 25, 26, 27] },
          { week: 1, days: [28, 29, 30, 31, 1, 2, 3] },
          { week: 2, days: [4, 5, 6, 7, 8, 9, 10] },
        ],
      ],
    ])('returns proper grid for %s', (date, grid) => {
      const { monthGrid } = useCalendarGrid({ date });
      testMonthGrid(monthGrid.value, grid);
    });
  });

  describe('yearGrid', () => {
    it.each([
      [
        '2020-01-01',
        [
          [
            { week: 1, days: [30, 31, 1, 2, 3, 4, 5] },
            { week: 2, days: [6, 7, 8, 9, 10, 11, 12] },
            { week: 3, days: [13, 14, 15, 16, 17, 18, 19] },
            { week: 4, days: [20, 21, 22, 23, 24, 25, 26] },
            { week: 5, days: [27, 28, 29, 30, 31, 1, 2] },
            { week: 6, days: [3, 4, 5, 6, 7, 8, 9] },
          ],
          [
            { week: 49, days: [30, 1, 2, 3, 4, 5, 6] },
            { week: 50, days: [7, 8, 9, 10, 11, 12, 13] },
            { week: 51, days: [14, 15, 16, 17, 18, 19, 20] },
            { week: 52, days: [21, 22, 23, 24, 25, 26, 27] },
            { week: 1, days: [28, 29, 30, 31, 1, 2, 3] },
            { week: 2, days: [4, 5, 6, 7, 8, 9, 10] },
          ],
        ],
      ],
    ])('returns proper grid for %s', (date, grid) => {
      const { yearGrid } = useCalendarGrid({ date });
      testMonthGrid(yearGrid.value.at(0), grid[0]);
      testMonthGrid(yearGrid.value.at(-1), grid[1]);
    });
  });

  describe('setWeekStart', () => {
    const dayNum = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    const daysToNumbers = (days) => days.map((day) => dayNum[day]);

    it.each([
      [0, [0, 1, 2, 3, 4, 5, 6]],
      [1, [1, 2, 3, 4, 5, 6, 0]],
      [2, [2, 3, 4, 5, 6, 0, 1]],
      [3, [3, 4, 5, 6, 0, 1, 2]],
      [4, [4, 5, 6, 0, 1, 2, 3]],
      [5, [5, 6, 0, 1, 2, 3, 4]],
      [6, [6, 0, 1, 2, 3, 4, 5]],
    ])('allows to change week start', (weekStart, daysOrder) => {
      const { weekdays, setWeekStart } = useCalendarGrid();

      setWeekStart(weekStart);
      expect(daysToNumbers(weekdays.value)).toEqual(daysOrder);
    });

    it('prevents to set invalid day number', () => {
      const { weekdays, setWeekStart } = useCalendarGrid();

      setWeekStart(-1);
      expect(daysToNumbers(weekdays.value)).toEqual([0, 1, 2, 3, 4, 5, 6]);

      setWeekStart(10);
      expect(daysToNumbers(weekdays.value)).toEqual([6, 0, 1, 2, 3, 4, 5]);
    });

    it('updates `weekGrid` on change weekStart', async () => {
      const { weekGrid, setWeekStart } = useCalendarGrid({
        date: '2020-01-01',
      });

      setWeekStart(0);
      testWeekGrid(weekGrid.value, 1, [29, 30, 31, 1, 2, 3, 4]);

      setWeekStart(1);
      testWeekGrid(weekGrid.value, 1, [30, 31, 1, 2, 3, 4, 5]);
    });
  });
});
