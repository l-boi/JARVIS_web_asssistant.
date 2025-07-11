
const micBtn = document.getElementById('mic');
const output = document.getElementById('output');
const clockEl = document.getElementById('clock');
const batteryEl = document.getElementById('battery');
const mapEl = document.getElementById('map');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function updateClock() {
  const now = new Date();
  clockEl.innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

if ('getBattery' in navigator) {
  navigator.getBattery().then(function(battery) {
    function updateBattery() {
      batteryEl.innerText = Math.round(battery.level * 100) + "%";
    }
    updateBattery();
    battery.addEventListener('levelchange', updateBattery);
  });
} else {
  batteryEl.innerText = "Battery info not supported";
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    mapEl.innerText = `Lat: ${position.coords.latitude.toFixed(2)}, Lon: ${position.coords.longitude.toFixed(2)}`;
  }, function() {
    mapEl.innerText = "Unable to get location.";
  });
} else {
  mapEl.innerText = "Geolocation not supported";
}

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
    response = "I am J.A.R.V.I.S, your assistant.";
  } else if (message.includes("open youtube")) {
    response = "Opening YouTube.";
    window.open("https://youtube.com", "_blank");
  } else if (message.includes("what's the time")) {
    response = "The current time is " + new Date().toLocaleTimeString();
  } else {
    response = "I'm sorry sir, I didn't catch that.";
  }
  output.innerHTML += "<br>Jarvis: " + response;
  speak(response);
}

function speak(message) {
  const speech = new SpeechSynthesisUtterance(message);
  speech.lang = "en-US";
  speech.pitch = 1;
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
}
