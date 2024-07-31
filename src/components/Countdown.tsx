import React, { useEffect, useState } from 'react';
interface CountdownTimerProps {
  initialTime: number;
}
const Countdown = ({ initialTime }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <span className='flex text-[14px]'>
      <div className=' mr-[4px] rounded-[3px] bg-[black] p-[5px] font-extrabold text-[white]'>
        <span className='animate-moveUp'>{formattedHours}</span>
      </div>
      <div className='mr-[4px] rounded-[3px] bg-[black] p-[5px] font-extrabold  text-[white]'>
        <span>{formattedMinutes}</span>
      </div>
      <div className='mr-[4px] rounded-[3px] bg-[black] p-[5px] font-extrabold  text-[white] '>
        <span className='animate-moveUp'>{formattedSeconds}</span>
      </div>
    </span>
  );
};

export default Countdown;
