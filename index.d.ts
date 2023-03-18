import dayjs from 'dayjs/esm/index';
import { MaybeComputedRef } from '@vueuse/shared';
import { ComputedRef, Ref } from 'vue';

interface DefaultValues {
  date?: MaybeComputedRef<Date | dayjs.Dayjs | string | number>;
  dateFormat?: MaybeComputedRef<string>;
}

export type WeekGrid = ComputedRef<{
  week: number;
  days: {
    date: number;
    dateString: string;
  }[];
}>;

export type MonthGrid = ComputedRef<WeekGrid[]>;

export type YearGrid = ComputedRef<MonthGrid[]>;

export function useCalendarGrid(defaultValues?: DefaultValues): {
  date: Ref<string>;
  weekdays: ComputedRef<dayjs.WeekdayNames>;
  months: ComputedRef<dayjs.MonthNames>;
  weekGrid: WeekGrid;
  monthGrid: MonthGrid;
  yearGrid: YearGrid;
  setDate(date: DefaultValues['date']): void;
  nextMonth(): void;
  prevMonth(): void;
  nextYear(): void;
  prevYear(): void;
  setWeekStart(week: number): void;
};
