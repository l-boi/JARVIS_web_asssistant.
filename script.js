const micBtn = document.getElementById('mic');
const output = document.getElementById('output');
const clock = document.getElementById('clock');
const batteryEl = document.getElementById('battery');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;

let isListening = false;

// Update clock every second
setInterval(() => {
  const now = new Date();
  const time = now.toLocaleTimeString();
  clock.textContent = `Current Time: ${time}`;
}, 1000);

// Get battery status
if (navigator.getBattery) {
  navigator.getBattery().then(battery => {
    function updateBattery() {
      const level = Math.round(battery.level * 100);
      batteryEl.textContent = `Battery: ${level}%`;
      speak(`Battery level is ${level} percent`);
    }
    updateBattery();
    battery.addEventListener('levelchange', updateBattery);
  });
} else {
  batteryEl.textContent = "Battery info not supported";
}

// Load Google Map
function initMap(lat, lng) {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat, lng },
    zoom: 15,
    styles: [ { elementType: "geometry", stylers: [{ color: "#00ffff" }] } ]
  });
  new google.maps.Marker({ position: { lat, lng }, map });
}

// Get location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    initMap(lat, lng);
    output.innerHTML += "<br>JARVIS: Location acquired.";
    speak("Location acquired.");
  }, () => {
    output.innerHTML += "<br>JARVIS: Unable to get location.";
    speak("Unable to get location.");
  });
}

// Speech synthesis
function speak(message) {
  const speech = new SpeechSynthesisUtterance(message);
  speech.lang = "en-GB";
  speech.pitch = 1;
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
}

// Voice commands
recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase();
  output.innerHTML += `<br>You said: ${transcript}`;
  reply(transcript);
};

function reply(message) {
  let response = "";

  if (message.includes("hello")) {
    response = "Hello sir.";
  } else if (message.includes("who are you")) {
    response = "I am J.A.R.V.I.S, your AI assistant.";
  } else if (message.includes("open youtube")) {
    response = "Opening YouTube.";
    window.open("https://youtube.com", "_blank");
  } else if (message.includes("what's the time") || message.includes("what is the time")) {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    response = `The current time is ${timeString}`;
  } else {
    response = "I'm sorry sir, I didn't catch that.";
  }

  output.innerHTML += `<br>JARVIS: ${response}`;
  speak(response);
}

// Start/stop listening on button click
micBtn.addEventListener('click', () => {
  if (!isListening) {
    recognition.start();
    isListening = true;
    micBtn.textContent = "🎤 Stop Listening";
  } else {
    recognition.stop();
    isListening = false;
    micBtn.textContent = "🎤 Start Listening";
  }
});
