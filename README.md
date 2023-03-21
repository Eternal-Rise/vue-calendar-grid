# Vue-calendar-grid

## Install

```shell
npm install @eternal_rise/vue-calendar-grid
```

or

```shell
yarn install @eternal_rise/vue-calendar-grid
```

## Usage

```vue
<script setup>
import { useCalendarGrid } from '@eternal_rise/vue-calendar-grid';

const { months, weekdays, yearGrid } = useCalendarGrid();
</script>

<template>
  <div class="calendar-year">
    <div v-for="(month, i) in yearGrid" class="calendar-year__month">
      <div class="calendar-year__month-title">
        {{ months[i] }}
      </div>
      <div class="calendar-year__month-row">
        <div></div>
        <div v-for="day in weekdays" class="calendar-year__day-of-week">
          {{ day[0] }}
        </div>
      </div>
      <div v-for="row in month" class="calendar-year__month-row">
        <div class="calendar-year__week-number">
          {{ row.week }}
        </div>
        <div v-for="day in row.days" class="calendar-year__day">
          {{ day.date }}
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.calendar-year {
  font-size: 0.85em;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  text-align: center;
}

.calendar-year__month-row {
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
}

.calendar-year__month-row > * {
  padding: 0.25em;
}

.calendar-year__week-number {
  background-color: #596b78;
}
</style>
```
