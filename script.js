const startEl = document.getElementById('start');
const stopEl = document.getElementById('stop');
const resetEl = document.getElementById('reset');
const cyclesEl = document.getElementById('cycles');

var workOrBreak = document.getElementById("work-or-break")

var minutesEl = document.getElementById('minutes');
var secondsEl = document.getElementById('seconds');

var bell = new Audio("/alarm.wav")


let timer
let running = false
let breakTimer = false
let cycles = 0
let workTime = 1500
let totalTime = workTime
let shortBreak = 300
let longBreak = 1800


function displayTime() {
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;

    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
    cyclesEl.innerText = `Cycles : ${cycles}`

    var update = breakTimer ? workOrBreak.innerText = "Break" : workOrBreak.innerText = "Work"
}

function startTimer() {
    if (totalTime > 0) {
        totalTime--
        displayTime()
    } else {
        bell.play()
        clearInterval(timer)
        running = false
        if (!breakTimer) {
            breakTimer = true
            alert("Take a break")
            let isShortTime = cycles % 4 != 0 || cycles == 0
            totalTime = isShortTime ? shortBreak : longBreak
        } else {
            breakTimer = false
            alert("Get back to work")
            cycles++
            totalTime = workTime
        }
        displayTime()
        start()
    }
}



function start() {
    if (running) return
    running = true

    timer = setInterval(() => {
        startTimer()
    }, 1000)
}

function stop() {
    clearInterval(timer)
    running = false
}

function reset() {
    clearInterval(timer)
    totalTime = 1500
    cycles = 0
    displayTime()
    running = false
    breakTimer = false
}



startEl.addEventListener('click', start);
stopEl.addEventListener('click', stop);
resetEl.addEventListener('click', reset);
