const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number: ' + randomNum);

// @ts-ignore
var recognition = new webkitSpeechRecognition() || new SpeechRecognition();

// Start Recogniton and Game
recognition.start();

// Capture User Speak
function onSpeak(e) {
    const msg = e.results[0][0].transcript;

    writeMessage(msg);
    checkNumber(msg);  
}

// Write User Speech
function writeMessage(msg){
    msgEl.innerHTML = `
    <div> You Said: </div>
    <span class = "box">${msg}</span>
    `;
}

// Check The User Number
function checkNumber(msg){
    const num = +msg;
    // Check if valid number
    if(Number.isNaN(num)){
        msgEl.innerHTML = `<div>That is not a valid number</div>`;
        return;
    }

    //Check in Range
    if(num > 100 || num < 1){
        msgEl.innerHTML +=  `<div>Number must be between 1 and 100</div>`
    }

    // Check number
    if(num===randomNum){
        document.body.innerHTML = `
        <h2>Congrats! You Have Guessed The Number. <br> <br>
        It was ${num}.</h2>
        <button class = "play-again" id = "play-again"> Play Again</button>
        `;
        return;
    } else if(num < randomNum) {
        msgEl.innerHTML += `<div>Go Higher</div>`;
        return;
    }
    else{
        msgEl.innerHTML += `<div>Go Lower</div>`;
        return; 
    }
}

// Generate Random Number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Speak Result
recognition.addEventListener('result', onSpeak);