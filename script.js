
// Get references
const micBtn = document.getElementById('mic');
const output = document.getElementById('output');
const clockDiv = document.getElementById('clock');
const batteryDiv = document.getElementById('battery');
const mapDiv = document.getElementById('map');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

let isAwaitingCommand = false;

// Wake word + listening
recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    output.innerHTML += "<br>You said: " + transcript;

    if (!isAwaitingCommand && transcript.includes("jarvis")) {
        output.innerHTML += "<br>Wake word detected! Listening for command...";
        isAwaitingCommand = true;
    } else if (isAwaitingCommand) {
        reply(transcript);
        isAwaitingCommand = false;
    }
};

// Restart recognition when it ends
recognition.onend = () => {
    recognition.start();
};

// Error log
recognition.onerror = (event) => {
    console.error("Recognition error:", event.error);
};

// Start listening when mic clicked
micBtn.addEventListener('click', () => {
    recognition.start();
    output.innerHTML += "<br>Listening for wake word...";
});

// Reply + speak
function reply(message) {
    let response = "";

    if (message.includes("hello")) {
        response = "Hello sir.";
    } else if (message.includes("who are you")) {
        response = "I am J.A.R.V.I.S, at your service sir.";
    } else if (message.includes("open youtube")) {
        response = "Opening YouTube sir.";
        window.open("https://youtube.com", "_blank");
    } else if (message.includes("what's the time") || message.includes("what is the time")) {
        const now = new Date();
        const timeString = now.toLocaleTimeString();
        response = "The current time is " + timeString;
    } else {
        response = "I'm sorry sir, I didn't catch that.";
    }

    output.innerHTML += "<br>Jarvis: " + response;
    speak(response);
}

// Speak function
function speak(message) {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-GB"; // British accent
    speech.pitch = 1;
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
}

// Clock update
setInterval(() => {
    const now = new Date();
    clockDiv.textContent = now.toLocaleTimeString();
}, 1000);

// Battery info
if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
        batteryDiv.textContent = "Battery: " + Math.round(battery.level * 100) + "%";
        battery.addEventListener('levelchange', () => {
            batteryDiv.textContent = "Battery: " + Math.round(battery.level * 100) + "%";
        });
    });
} else {
    batteryDiv.textContent = "Battery info not supported";
}

// Location
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const coords = position.coords.latitude.toFixed(2) + ", " + position.coords.longitude.toFixed(2);
            mapDiv.textContent = "Location: " + coords;
        },
        () => {
            mapDiv.textContent = "Unable to get location.";
        }
    );
} else {
    mapDiv.textContent = "Geolocation not supported";
}

// Start listening immediately
recognition.start();
