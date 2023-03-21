import dayjs from 'dayjs/esm';
import { MaybeComputedRef } from '@vueuse/shared';
import { ComputedRef, Ref } from 'vue';

export type WeekdayNames = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];
export type MonthNames = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export interface DefaultValues {
  date?: MaybeComputedRef<Date | dayjs.Dayjs | string | number>;
  dateFormat?: MaybeComputedRef<string>;
}

export interface WeekGrid {
  week: number;
  days: {
    date: number;
    dateString: string;
  }[];
}

export function useCalendarGrid(defaultValues?: DefaultValues): {
  date: Ref<string>;
  weekdays: ComputedRef<WeekdayNames>;
  months: ComputedRef<MonthNames>;
  weekGrid: ComputedRef<WeekGrid>;
  monthGrid: ComputedRef<WeekGrid[]>;
  yearGrid: ComputedRef<WeekGrid[][]>;
  setDate(date: DefaultValues['date']): void;
  nextMonth(): void;
  prevMonth(): void;
  nextYear(): void;
  prevYear(): void;
  setWeekStart(week: number): void;
};
