/* eslint-disable react/prop-types */
import { useEffect, useReducer, useRef, useState } from "react";
import { MemorizedTensorFLow } from "../TensorFlow/TensorFlow";
import Button from "../UI/Button";
import AccessButtons from "../UI/AccessButtons";
import ResumeIcon from "../../assets/Icons/resume.png";
import PauseIcon from "../../assets/Icons/pause.png";

const timeReducer = (state, action) => {
  if (action.type === "changed") {
    return {
      hours: Math.floor((state.totalTime - 1) / (60 * 60)),
      minutes: Math.floor((state.totalTime - 1) / 60) % 60,
      seconds: (state.totalTime - 1) % 60,
      totalTime: state.totalTime - 1,
    };
  }
};

const Timer = ({ hour, minute, endTimer, camra, pause }) => {
  const [time, dispatch] = useReducer(timeReducer, {
    hours: +hour,
    minutes: +minute,
    seconds: 0,
    totalTime: hour * 60 * 60 + minute * 60,
  });
  const interval = useRef(null);
  // const [pause, setPause] = useState(false);

  const totalTimeRef = useRef(hour * 60 * 60 + minute * 60);
  const counter = () => {
    dispatch({
      type: "changed",
    });
  };
  const pauseHandler = () => {
    setPause((state) => {
      return !state;
    });
  };
  useEffect(() => {
    if (!pause) {
      interval.current = setInterval(() => {
        totalTimeRef.current = totalTimeRef.current - 1;
        if (totalTimeRef.current === 0) {
          console.log(time.totalTime);
          clearInterval(interval);
          endTimer();
        }
        counter();
      }, 1000);
    } else {
      clearInterval(interval.current);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [pause]);
  return (
    <div className="text-slate-50 flex items-center flex-col justify-center bg-[#00000093] w-x h-x rounded-round time_container">
      <div className="text-xxl font-la flex items-center justify-center">
        <span>{time.hours < 10 ? `0${time.hours}` : `${time.hours}`}:</span>
        <span>
          {time.minutes < 10 ? `0${time.minutes}` : `${time.minutes}`}:
        </span>
        <span>
          {time.seconds < 10 ? `0${time.seconds}` : `${time.seconds}`}
        </span>
      </div>

      <div className="absolute">
        {camra && !pause && <MemorizedTensorFLow></MemorizedTensorFLow>}
      </div>
    </div>
  );
};

export default Timer;
