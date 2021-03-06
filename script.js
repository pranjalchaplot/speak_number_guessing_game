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
    <div class="msg"> You Said: </div>
    <span class = "box">${msg}</span>
    `;
}

// Check The User Number
function checkNumber(msg){
    const num = +msg;
    // Check if valid number
    if(Number.isNaN(num)){
        msgEl.innerHTML += `<div class="msg">That is not a valid number</div>`;
        return;
    }

    //Check in Range
    if(num > 100 || num < 1){
        msgEl.innerHTML +=  `<div class="msg">Number must be between 1 and 100</div>`
    }

    // Check number
    if(num===randomNum){
        document.getElementById("container").innerHTML = `
        <h2 class="msg">Congrats! You Have Guessed The Number. <br> <br>
        It was ${num}.</h2>
        <button class = "play-again" id = "play-again"> Play Again</button>
        `;
        return;
    } else if(num < randomNum) {
        msgEl.innerHTML += `<div class="msg">Go Higher</div>`;
    }
    else{
        msgEl.innerHTML += `<div class="msg">Go Lower</div>`; 
    }
}

// Generate Random Number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Speak Result
recognition.addEventListener('result', onSpeak);

// End Speech Recongnition
recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', e => {
    if(e.target.id === 'play-again') {
        window.location.reload();
    }
});