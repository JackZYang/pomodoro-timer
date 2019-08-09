import React from 'react';

const Timer = ({remainingTime}) => {
    const minutes = Math.floor(remainingTime/60);
    const seconds = ('0' + remainingTime%60).slice(-2)
    return (
        <div>
            {minutes + ":" + seconds}
        </div>        
    );
}
export default Timer;