"use client";
import { useEffect, useState } from "react";

interface Props {
    start: string;
    end: string;
}

interface CountDown {
    days: number;
    hours: number
    minutes: number;
    seconds: number;
}

const EventData: React.FC<Props> = ({ start, end }) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const [countdown, setCountdown] = useState<CountDown | null>(null);
    const [status, setStatus] = useState<'countdown' | 'started' | 'ended'>('countdown');

    const dateFormatter = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: 'CET',
    });

    const timeFormatter = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'CET',
    });

    const formattedStartDate = dateFormatter.format(startDate);
    const formattedStartTime = timeFormatter.format(startDate);

    const formattedEndDate = dateFormatter.format(endDate);
    const formattedEndTime = timeFormatter.format(endDate);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();

            if (now >= endDate) {
                clearInterval(interval);
                setCountdown(null);
                setStatus('ended');
                return;
            };

            if (now >= startDate && now < endDate) {
                clearInterval(interval);
                setCountdown(null);
                setStatus('started');
                return;
            };

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
                }
            );
        }, 1000);

        return () => clearInterval(interval);
    }, [start]);

    return (
        <div className="flex flex-col gap-8">
            <div className='flex flex-col lg:flex-row lg:gap-[38px]'>
                <div className='flex flex-col gap-4 mb-11'>
                    <span className='uppercase text-light-gray font-medium text-sm'>Start TIME</span>
                    <div className="flex flex-col">
                        <span className="text-subtitles font-semibold text-2xl lg:text-xl">{formattedStartDate}</span>
                        <span className="text-subtitles font-medium text-xl lg:text-lg">{formattedStartTime} hrs CET</span>
                    </div>
                </div>
                <div className='flex flex-col gap-4 mb-11'>
                    <span className='uppercase text-light-gray font-medium text-sm'>End TIME</span>
                    <div className="flex flex-col">
                        <span className="text-subtitles font-semibold text-2xl lg:text-xl">{formattedEndDate}</span>
                        <span className="text-subtitles font-medium text-xl lg:text-lg">{formattedEndTime} hrs CET</span>
                    </div>
                </div>
            </div>
            {status === 'countdown' && countdown ? (
                <div className="flex items-center gap-5">
                    <span className="uppercase text-xs text-light-gray font-medium">EVENT STARTS IN</span>
                    <div className="flex gap-1.5">
                        <div className="flex flex-col w-[66px] py-1.5 px-3 justify-start border border-light-gray rounded-lg">
                            <span className="font-bold text-lg text-gray">{countdown?.days}</span>
                            <span className="uppercase text-[10px] font-medium text-gray">Days</span>
                        </div>
                        <div className="flex flex-col w-[66px] py-1.5 px-3 justify-start border border-light-gray rounded-lg">
                            <span className="font-bold text-lg text-gray">{countdown?.hours}</span>
                            <span className="uppercase text-[10px] font-medium text-gray">Hours</span>
                        </div>
                        <div className="flex flex-col w-[66px] py-1.5 px-3 justify-start border border-light-gray rounded-lg">
                            <span className="font-bold text-lg text-gray">{countdown?.minutes}</span>
                            <span className="uppercase text-[10px] font-medium text-gray">MINS</span>
                        </div>
                        <div className="flex flex-col w-[66px] py-1.5 px-3 justify-start border border-light-gray rounded-lg">
                            <span className="font-bold text-lg text-gray">{countdown?.seconds}</span>
                            <span className="uppercase text-[10px] font-medium text-gray">SECS</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-2.5">
                    <span className="uppercase text-xs text-light-gray font-medium">THIS EVENT HAS</span>
                    <span className="font-semibold text-3xl text-primary-darker uppercase">{status}</span>
                </div>
            )}
        </div>

    );
};

export default EventData;