
const micBtn = document.getElementById('mic');
const output = document.getElementById('output');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => {
    output.innerHTML += "<br>Listening...";
};

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    output.innerHTML += "<br>You said: " + transcript;
    reply(transcript);
};

micBtn.addEventListener('click', () => {
    recognition.start();
});

function reply(message) {
    let response = "";

    if (message.includes("hello")) {
        response = "Hello sir.";
    } else if (message.includes("who are you")) {
        response = "I am JARVIS, at your service.";
    } else if (message.includes("open youtube")) {
        response = "Opening YouTube sir. Please tap the link below.";
        output.innerHTML += '<br><a href="https://youtube.com" target="_blank">Go to YouTube</a>';
    } else if (message.includes("what's the time") || message.includes("what is the time")) {
        const now = new Date();
        response = "The current time is " + now.toLocaleTimeString();
    } else {
        response = "I'm sorry sir, I didn't catch that.";
    }
    output.innerHTML += "<br>Jarvis: " + response;
    speak(response);
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.pitch = 1;
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
}
