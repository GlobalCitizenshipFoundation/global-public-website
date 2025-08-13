'use client';
import { useEffect, useState } from 'react';
import { eventData } from '../../../../../lib/event-date';
import { eventTime } from '../../../../../lib/event-time';

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

const EventData: React.FC<Props> = ({ start, end }) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const [countdown, setCountdown] = useState<CountDown | null>(null);
  const [status, setStatus] = useState<'countdown' | 'started' | 'ended'>('countdown');

  const formattedStartDate = eventData(start);
  const formattedStartTime = eventTime(start);

  const formattedEndDate = eventData(end);
  const formattedEndTime = eventTime(start);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      if (now >= endDate) {
        clearInterval(interval);
        setCountdown(null);
        setStatus('ended');
        return;
      }

      if (now >= startDate && now < endDate) {
        clearInterval(interval);
        setCountdown(null);
        setStatus('started');
        return;
      }

      const diff = startDate.getTime() - now.getTime();
      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setCountdown({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [start]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row lg:gap-[38px]">
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
            <div className="border-light-gray flex w-[66px] flex-col justify-start rounded-lg border px-3 py-1.5">
              <span className="text-gray text-lg font-bold">{countdown?.days}</span>
              <span className="text-gray text-[10px] font-medium uppercase">Days</span>
            </div>
            <div className="border-light-gray flex w-[66px] flex-col justify-start rounded-lg border px-3 py-1.5">
              <span className="text-gray text-lg font-bold">{countdown?.hours}</span>
              <span className="text-gray text-[10px] font-medium uppercase">Hours</span>
            </div>
            <div className="border-light-gray flex w-[66px] flex-col justify-start rounded-lg border px-3 py-1.5">
              <span className="text-gray text-lg font-bold">{countdown?.minutes}</span>
              <span className="text-gray text-[10px] font-medium uppercase">MINS</span>
            </div>
            <div className="border-light-gray flex w-[66px] flex-col justify-start rounded-lg border px-3 py-1.5">
              <span className="text-gray text-lg font-bold">{countdown?.seconds}</span>
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
