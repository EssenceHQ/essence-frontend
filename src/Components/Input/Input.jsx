/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import Timer from "../Timer/Timer";
import Button from "../UI/Button";
import noVideo from "../../assets/Icons/icons8-no-video-96.png";
import showVideo from "../../assets/Icons/icons8-video-call-90.png";
import DropDownMenu from "../UI/DropDownMenu";

const Input = ({ showMenu, menuHandler }) => {
  const hoursRef = useRef(0);
  const minutesRef = useRef(0);
  const hours = useRef(0);
  const minutes = useRef(0);

  const [timerVisibility, setTimerVisibility] = useState(false);
  const [camra, setCamra] = useState(true);

  const startTimer = () => {
    setTimerVisibility(true);
  };

  const endTimer = () => {
    return new Promise((res) => {
      setTimerVisibility(() => {
        res();
        return false;
      });
    });
  };
  const camraHandler = () => {
    setCamra((state) => {
      return !state;
    });
  };
  const cancelHandler = () => {
    setTimerVisibility(false);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    hours.current = hoursRef.current.value;
    minutes.current = minutesRef.current.value;
    if (hours > 24) {
      alert("Please enter the hours less than or equal to 24 hours");
      return;
    } else if (minutes >= 60) {
      alert("Please enter the valid minutes");
      return;
    }
    endTimer().then(() => {
      startTimer();
    });
  };

  const timeChangeHandler = (selectedTime) => {
    const time = selectedTime;

    if (+time >= 60) {
      hoursRef.current.value = Math.floor(+time / 60);
      minutesRef.current.value = +time % 60;
    } else {
      hoursRef.current.value = 0;
      minutesRef.current.value = +time;
    }
  };
  useEffect(() => {
    hoursRef.current.value = 0;
    minutesRef.current.value = 10;
  }, []);
  return (
    <div className="flex flex-col gap-3 ">
      <div className="flex">
        {!timerVisibility && (
          <form
            className="flex flex-col items-center gap-8"
            onSubmit={submitHandler}
          >
            <div className="flex gap-3">
              <input
                ref={hoursRef}
                className="text-3xl py-4 rounded-lg "
                placeholder="hours"
              ></input>
              <input
                ref={minutesRef}
                className="text-3xl py-4 rounded-lg"
                placeholder="minutes"
              ></input>
            </div>
            <div>
              <Button text="Start"></Button>
            </div>
          </form>
        )}
        {!timerVisibility && (
          <div className="relative">
            <button
              onClick={menuHandler}
              className="text-3xl  bg-white px-3 py-3 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height="24"
                width="24"
              >
                <title>timer-edit</title>
                <path d="M15 3H9V1H15V3M19.39 10.74L11 19.13V21.94C6.5 21.44 3 17.63 3 13C3 8.03 7.03 4 12 4C14.12 4 16.07 4.74 17.62 6L19.04 4.56C19.55 5 20 5.46 20.45 5.97L19.03 7.39C19.67 8.19 20.17 9.11 20.5 10.1C20.1 10.21 19.71 10.42 19.39 10.74M13 7H11V14H13V7M13 19.96V22H15.04L21.17 15.88L19.13 13.83L13 19.96M22.85 13.47L21.53 12.15C21.33 11.95 21 11.95 20.81 12.15L19.83 13.13L21.87 15.17L22.85 14.19C23.05 14 23.05 13.67 22.85 13.47Z" />
              </svg>
            </button>
            {showMenu && (
              <DropDownMenu
                timeChangeHandler={timeChangeHandler}
                menuHandler={menuHandler}
              ></DropDownMenu>
            )}
          </div>
        )}
      </div>

      {timerVisibility && (
        <Timer
          endTimer={endTimer}
          hour={hours.current}
          minute={minutes.current}
          camra={camra}
        ></Timer>
      )}
      {timerVisibility && (
        <div className="w-full flex items-center justify-center">
          <Button text="Reset" onClick={cancelHandler}></Button>
        </div>
      )}
      <div className="w-full flex items-center justify-center">
        <div
          onClick={camraHandler}
          className="text-slate-50 text-4xl border border-[#156669] bg-[#156669] px-4 py-2 rounded-lg"
        >
          <img className={`h-16`} src={camra ? showVideo : noVideo}></img>
        </div>
      </div>
    </div>
  );
};

export default Input;
