import React from 'react'
import { useState, useEffect } from 'react';

// Source: https://stackoverflow.com/questions/40885923/countdown-timer-in-react

interface ITimerProps {
    initialMinute : number;
    initialSeconds : number;
    onTimeout : (() => void);
  }

const Timer = (props: ITimerProps) => {
    // const {initialMinute = 0,initialSeconds = 0, onTimeout} = props;
    const [ minutes, setMinutes ] = useState(props.initialMinute);
    const [seconds, setSeconds ] =  useState(props.initialSeconds);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval)
                    props.onTimeout()
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <div>
        { minutes === 0 && seconds === 0
            ? null
            : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
    )
}

export default Timer;