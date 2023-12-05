import moment from 'moment';

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const calculateTimeRemaining = (endDate: moment.Moment): TimeRemaining => {
  const now = moment();
  const timeDifference = endDate.diff(now, 'seconds');

  if (timeDifference <= 0) {
    // Timer has expired
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(timeDifference / (24 * 60 * 60));
  const hours = Math.floor((timeDifference % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeDifference % (60 * 60)) / 60);
  const seconds = Math.floor(timeDifference % 60);

  return { days, hours, minutes, seconds };
};
