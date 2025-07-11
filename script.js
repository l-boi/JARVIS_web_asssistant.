
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

recognition.onend = () => {
    recognition.start();
};

recognition.onerror = (event) => {
    console.error("Recognition error:", event.error);
};

micBtn.addEventListener('click', () => {
    speak("Jarvis online, sir.");
    recognition.start();
    output.innerHTML += "<br>Listening for wake word...";
});

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

function speak(message) {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-GB";
    speech.pitch = 0.8;
    speech.rate = 1;

    const voices = window.speechSynthesis.getVoices();
    const jarvisVoice = voices.find(voice =>
        voice.name.includes("Daniel") ||
        voice.name.includes("Google UK English Male") ||
        voice.name.includes("Alex")
    );
    if (jarvisVoice) {
        speech.voice = jarvisVoice;
    }

    window.speechSynthesis.speak(speech);
}

// List available voices
function listVoices() {
    const voices = window.speechSynthesis.getVoices();
    output.innerHTML += "<br><b>Available voices:</b>";
    voices.forEach(voice => {
        output.innerHTML += `<br>- ${voice.name} (${voice.lang})`;
    });
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

// Wait a bit to let voices load, then list them
setTimeout(listVoices, 1000);
