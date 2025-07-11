
const micBtn = document.getElementById('mic');
const output = document.getElementById('output');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;

let availableVoices = [];

// Wait for voices to load
window.speechSynthesis.onvoiceschanged = () => {
    availableVoices = window.speechSynthesis.getVoices();
    console.log("Voices loaded:", availableVoices);
};

recognition.onstart = () => {
    output.innerHTML = "Listening...";
};

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    output.innerHTML = "You said: " + transcript;
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
        response = "I am JARVIS, your virtual assistant.";
    } else if (message.includes("open youtube")) {
        response = "Opening YouTube sir.";
        window.open("https://youtube.com", "_blank");
    } else if (message.includes("time")) {
        const now = new Date();
        response = "The current time is " + now.toLocaleTimeString();
    } else {
        response = "I'm sorry sir, I didn't catch that.";
    }
    output.innerHTML += "<br>Jarvis: " + response;
    speak(response);
}

function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    console.log("Speaking with voices:", availableVoices);
    if (availableVoices.length > 0) {
        const selectedVoice = availableVoices.find(voice =>
            voice.lang.includes('en') && voice.name.toLowerCase().includes('male')
        ) || availableVoices.find(voice => voice.lang.includes('en'));
        if (selectedVoice) {
            utterance.voice = selectedVoice;
            console.log("Using voice:", selectedVoice.name);
        }
    } else {
        console.log("No voices loaded yet, using default.");
    }
    utterance.lang = "en-GB";
    utterance.pitch = 1;
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
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
