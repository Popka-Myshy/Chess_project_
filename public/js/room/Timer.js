class Timer{
    constructor(player, roomID, minutes, seconds, updateTimerCallback, timerEndCallback){
        this.player = player;
        this.roomID = roomID;
        this.minutes = minutes;
        this.seconds = seconds;
        this.interval = null;
        this.updateTimerCallback = updateTimerCallback;
        this.timerEndCallback = timerEndCallback;
    }


    start(){
        this.interval = setInterval(() => {
            this.seconds --;

            if(this.minutes === 0 && this.seconds === 0){
                this.stop();
                this.timerEndCallback();
                return;
            }

            if(this.seconds <0){
                this.minutes --;

                this.seconds = 59;
            }

            Socket.emit('update-timer', roomID, this.minutes, this.seconds);
            this.updateTimerCallback(this.player, this.minutes, this.seconds)
        }, 1000)
    }

    stop(){
        clearInterval(this.interval);
        this.interval = null;
    }
}