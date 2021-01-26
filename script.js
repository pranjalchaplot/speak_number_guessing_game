const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number: ' + randomNum);

var recognition = new webkitSpeechRecognition() || new SpeechRecognition();

// Start Recogniton and Game
recognition.start();

// Capture User Speak
function onSpeak(e) {
    const msg = e.results[0][0].transcript;
}

// Generate Random Number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Speak Result
recognition.addEventListener('result', onSpeak);