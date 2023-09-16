// Define global variables to store timer state and interval reference
let startTime; // Stores the timestamp when the timer started
let interval;   // Reference to the interval for updating the timer
let isRunning = false; // Tracks if the timer is currently running or paused

// Function to start or pause the timer
function start() {
    if (!isRunning) {
        // If the timer is not running, start it
        startTime = Date.now() - (localStorage.getItem('elapsedTime') || 0);
        interval = setInterval(updateTime, 10); // Update time every 10 milliseconds
        isRunning = true;
        document.getElementById('startBtn').textContent = 'Pause'; // Change button text to "Pause"
    } else {
        // If the timer is running, pause it
        clearInterval(interval);
        isRunning = false;
        document.getElementById('startBtn').textContent = 'Resume'; // Change button text to "Resume"
    }
}

// Function to stop the timer
function stop() {
    if (isRunning) {
        clearInterval(interval); // Clear the interval to pause the timer
        isRunning = false;
        document.getElementById('startBtn').textContent = 'Start'; // Change button text to "Start"
    }
}

// Function to reset the timer
function reset() {
    clearInterval(interval); // Clear the interval if the timer is running
    isRunning = false;
    document.getElementById('startBtn').textContent = 'Start'; // Change button text to "Start"
    startTime = undefined; // Reset the start time
    localStorage.removeItem('elapsedTime'); // Remove the elapsed time from local storage
    // Set the display to "00:00:00"
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
}

// Function to update the timer display
function updateTime() {
    if (!startTime) {
        return; // If the timer hasn't started, do nothing
    }
    const elapsedTime = Date.now() - startTime;
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);

    // Update the timer display with the elapsed time
    document.getElementById('hours').textContent = padZero(hours);
    document.getElementById('minutes').textContent = padZero(minutes);
    document.getElementById('seconds').textContent = padZero(seconds);

    // Store the elapsed time in local storage for persistence
    localStorage.setItem('elapsedTime', elapsedTime.toString());
}

// Function to pad a number with leading zeros
function padZero(num) {
    return num.toString().padStart(2, '0');
}

// Initial call to display any previously stored time
updateTime();

