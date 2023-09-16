let startTime;
let interval;
let isRunning = false;

function start() {
    if (!isRunning) {
        startTime = Date.now() - (localStorage.getItem('elapsedTime') || 0);
        interval = setInterval(updateTime, 10);
        isRunning = true;
        document.getElementById('startBtn').textContent = 'Pause';
    } else {
        clearInterval(interval);
        isRunning = false;
        document.getElementById('startBtn').textContent = 'Resume';
    }
}

function stop() {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
        document.getElementById('startBtn').textContent = 'Start';
    }
}

function reset() {
    clearInterval(interval);
    isRunning = false;
    document.getElementById('startBtn').textContent = 'Start';
    startTime = undefined;
    localStorage.removeItem('elapsedTime');
    // Set the display to "00:00:00"
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
}

function updateTime() {
    if (!startTime) {
        return;
    }
    const elapsedTime = Date.now() - startTime;
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor(elapsedTime % 1000);

    document.getElementById('hours').textContent = padZero(hours);
    document.getElementById('minutes').textContent = padZero(minutes);
    document.getElementById('seconds').textContent = padZero(seconds);

    localStorage.setItem('elapsedTime', elapsedTime.toString());
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

// Initial call to display any previously stored time
updateTime();
