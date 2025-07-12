
const micBtn = document.getElementById('mic');
const output = document.getElementById('output');
let lastResponse = "";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;

let availableVoices = [];

window.speechSynthesis.onvoiceschanged = () => {
    availableVoices = window.speechSynthesis.getVoices();
};

micBtn.addEventListener('click', () => {
    greetAndListen();
});

function greetAndListen() {
    const greet = new SpeechSynthesisUtterance("At your service, sir.");
    if (availableVoices.length > 0) {
        const selected = availableVoices.find(v => v.lang.includes('en'));
        if (selected) greet.voice = selected;
    }
    window.speechSynthesis.speak(greet);
    recognition.start();
}

recognition.onstart = () => {
    output.innerHTML += "<br>Listening...";
};

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    output.innerHTML += "<br>You said: " + transcript;
    reply(transcript);
};

function reply(message) {
    let response = "";
    if (message.includes("hello")) {
        response = "Hello sir.";
    } else if (message.includes("who are you")) {
        response = "I am JARVIS, your virtual assistant.";
    } else if (message.includes("open youtube")) {
        response = "Opening YouTube sir.";
        window.open("https://youtube.com", "_blank");
    } else if (message.includes("open arc reactor project") || message.includes("open arc reactor")) {
        response = "Opening the Arc Reactor project, sir.";
        window.open("arc-reactor.html", "_blank");
    } else if (message.includes("time")) {
        const now = new Date();
        response = "The current time is " + now.toLocaleTimeString();
    } else {
        response = "I'm sorry sir, I didn't catch that.";
    }
    lastResponse = response;
    output.innerHTML += "<br>Jarvis: " + response;
    showSpeakButton();
}

function showSpeakButton() {
    output.innerHTML += '<br><button onclick="speakLast()">🔊 Hear Jarvis reply</button>';
}

function speakLast() {
    const utter = new SpeechSynthesisUtterance(lastResponse);
    if (availableVoices.length > 0) {
        const selected = availableVoices.find(v => v.lang.includes('en'));
        if (selected) utter.voice = selected;
    }
    utter.lang = "en-GB";
    utter.pitch = 1;
    utter.rate = 1;
    window.speechSynthesis.speak(utter);
}

// Clock
setInterval(() => {
    document.getElementById('clock').textContent = new Date().toLocaleTimeString();
}, 1000);

// Battery
if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
        function updateBattery() {
            document.getElementById('battery').textContent = Math.round(battery.level * 100) + "%";
        }
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
    });
} else {
    document.getElementById('battery').textContent = "Battery info not supported";
}

// Location
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(pos => {
        const coords = pos.coords.latitude.toFixed(2) + ", " + pos.coords.longitude.toFixed(2);
        document.getElementById('map').textContent = coords;
    }, () => {
        document.getElementById('map').textContent = "Unable to get location.";
    });
} else {
    document.getElementById('map').textContent = "Geolocation not supported";
}
