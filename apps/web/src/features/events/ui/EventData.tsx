'use client';

import { useEffect, useMemo, useState } from 'react';
import { formatEventDate } from '@/features/events/lib/formatters';
import { formatEventTime } from '@/features/events/lib/formatters';

interface Props {
  start: string;
  end: string;
}

interface CountDown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type Status = 'countdown' | 'started' | 'ended';

function getCountdown(target: Date, now: Date): CountDown {
  const diffMs = target.getTime() - now.getTime();
  const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));

  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

const EventData: React.FC<Props> = ({ start, end }) => {
  const startDate = useMemo(() => new Date(start), [start]);
  const endDate = useMemo(() => new Date(end), [end]);

  const [countdown, setCountdown] = useState<CountDown | null>(null);
  const [status, setStatus] = useState<Status>('countdown');

  const formattedStartDate = formatEventDate(start);
  const formattedStartTime = formatEventTime(start);

  const formattedEndDate = formatEventDate(end);
  const formattedEndTime = formatEventTime(end);

  useEffect(() => {
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      setCountdown(null);
      setStatus('ended');
      return;
    }

    const tick = () => {
      const now = new Date();

      if (now >= endDate) {
        setCountdown(null);
        setStatus('ended');
        return;
      }

      if (now >= startDate) {
        setCountdown(null);
        setStatus('started');
        return;
      }

      setStatus('countdown');
      setCountdown(getCountdown(startDate, now));
    };

    tick();

    const intervalId = window.setInterval(tick, 1000);
    return () => window.clearInterval(intervalId);
  }, [startDate, endDate]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row lg:gap-9.5">
        <div className="mb-11 flex flex-col gap-4">
          <span className="text-light-gray text-sm font-medium uppercase">Start TIME</span>
          <div className="flex flex-col">
            <span className="text-subtitles text-2xl font-semibold lg:text-xl">
              {formattedStartDate}
            </span>
            <span className="text-subtitles text-xl font-medium lg:text-lg">
              {formattedStartTime} hrs CET
            </span>
          </div>
        </div>

        <div className="mb-11 flex flex-col gap-4">
          <span className="text-light-gray text-sm font-medium uppercase">End TIME</span>
          <div className="flex flex-col">
            <span className="text-subtitles text-2xl font-semibold lg:text-xl">
              {formattedEndDate}
            </span>
            <span className="text-subtitles text-xl font-medium lg:text-lg">
              {formattedEndTime} hrs CET
            </span>
          </div>
        </div>
      </div>

      {status === 'countdown' && countdown ? (
        <div className="flex items-center gap-5">
          <span className="text-light-gray text-xs font-medium uppercase">EVENT STARTS IN</span>

          <div className="flex gap-1.5">
            <div className="border-light-gray flex w-16.5 flex-col justify-start rounded-lg border px-3 py-1.5">
              <span className="text-gray text-lg font-bold">{countdown.days}</span>
              <span className="text-gray text-[10px] font-medium uppercase">Days</span>
            </div>

            <div className="border-light-gray flex w-16.5 flex-col justify-start rounded-lg border px-3 py-1.5">
              <span className="text-gray text-lg font-bold">{countdown.hours}</span>
              <span className="text-gray text-[10px] font-medium uppercase">Hours</span>
            </div>

            <div className="border-light-gray flex w-16.5 flex-col justify-start rounded-lg border px-3 py-1.5">
              <span className="text-gray text-lg font-bold">{countdown.minutes}</span>
              <span className="text-gray text-[10px] font-medium uppercase">MINS</span>
            </div>

            <div className="border-light-gray flex w-16.5 flex-col justify-start rounded-lg border px-3 py-1.5">
              <span className="text-gray text-lg font-bold">{countdown.seconds}</span>
              <span className="text-gray text-[10px] font-medium uppercase">SECS</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          <span className="text-light-gray text-xs font-medium uppercase">THIS EVENT HAS</span>
          <span className="text-primary-darker text-3xl font-semibold uppercase">{status}</span>
        </div>
      )}
    </div>
  );
};

export default EventData;
