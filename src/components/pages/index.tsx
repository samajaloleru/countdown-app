import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import logo from '../../assets/images/logo.png';
import bgVideo from '../../assets/images/video.mp4';

interface TimeRemaining {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface TimeBoxProps {
  label: string;
  value: string;
  isLast?: boolean;
}

// Move deadline outside the component to ensure it's stable
const deadline = new Date("December 31, 2024 23:59:59");

export default function Home(): JSX.Element {
  const [isComplete, setIsComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const total = Date.parse(deadline.toString()) - Date.parse(new Date().toString());
      const seconds = Math.floor((total / 1000) % 60);
      const minutes = Math.floor((total / 1000 / 60) % 60);
      const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
      const days = Math.floor(total / (1000 * 60 * 60 * 24));

      return { total, days, hours, minutes, seconds };
    };

    const updateClock = () => {
      const t = calculateTimeRemaining();

      setTimeRemaining({
        days: ("0" + t.days).slice(-2),
        hours: ("0" + t.hours).slice(-2),
        minutes: ("0" + t.minutes).slice(-2),
        seconds: ("0" + t.seconds).slice(-2),
      });

      if (t.total <= 0) {
        setIsComplete(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    };

    intervalRef.current = setInterval(updateClock, 1000);
    updateClock();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="flex flex-col items-center w-11/12 z-30 lg:p-10 p-3 text-white">
      {!isComplete ? (
        <div className="flex flex-col w-full gap-5 bg-black bg-opacity-50 rounded-xl">
          <div className="flex flex-row items-center justify-between w-full">
            <Link
              to="/games"
              className="fl mt3 no-underline oswald-font bg-yellow-500 hover-orange w-auto p-3 font-semibold br2"
            >
              Play Games
            </Link>
            <div className="fr-ns right-0-ns">
              <img className="h-20" src={logo} alt="Logo" />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div id="clockdiv" className="flex flex-row lg:gap-4 items-center justify-center">
              <TimeBox label="Days" value={timeRemaining.days} />
              <Separator />
              <TimeBox label="Hours" value={timeRemaining.hours} />
              <Separator />
              <TimeBox label="Minutes" value={timeRemaining.minutes} />
              <Separator />
              <TimeBox label="Seconds" value={timeRemaining.seconds} isLast />
            </div>
          </div>
          <div className="flex w-full font-bold tracking-wide text-yellow lg:text-[6rem] text-[2rem] justify-center capitalize oswald-font">
            to the Year 2025
          </div>
        </div>
      ) : (
        <div className="relative h-screen w-full">
          {/* Video Background */}
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={bgVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

          {/* Text Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <div className="text-white w-3/5 text-4xl lg:text-[9rem] lg:leading-[10rem] md:text-[5rem] font-bold text-center">
              Welcome to the Year <span className="text-yellow-500 font-extrabold">2025.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const TimeBox: React.FC<TimeBoxProps> = ({ label, value, isLast = false }) => (
  <div
    className={`lg:w-full w-1/2 flex flex-col items-center hover:text-yellow-500 cursor-pointer pa3 ${
      isLast ? "text-yellow-500" : "text-white"
    } br4`}
  >
    <div className="flex lg:text-[18rem] text-[4rem] font-semibold">{value}</div>
    <div className={`flex lg:text-[5rem] text-[1.5rem] ${isLast ? "text-yellow" : ""}`}>{label}</div>
  </div>
);

const Separator: React.FC = () => (
  <div className="w-auto flex-auto ">
    <div className="lg:text-[5rem]">:</div>
  </div>
);
