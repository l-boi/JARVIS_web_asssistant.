
let lastResponse = "";

const micBtn = document.getElementById('mic');
const output = document.getElementById('output');

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;

micBtn.addEventListener('click', () => {
  recognition.start();
  output.innerHTML = "Listening...";
});

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript.toLowerCase();
  output.innerHTML = "You said: " + transcript;
  reply(transcript);
};

function reply(message) {
  let response = "";
  if (message.includes("open arc reactor project")) {
    response = "Opening arc reactor project sir.";
    window.location.href = "arc-reactor.html";
  } else {
    response = "I'm sorry sir, I didn't catch that.";
  }
  output.innerHTML += "<br>Jarvis: " + response;
  speak(response);
  lastResponse = response;
}

function speak(message) {
  const speech = new SpeechSynthesisUtterance(message);
  speech.lang = "en-US";
  speech.pitch = 1;
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
}

function speakLast() {
  if (lastResponse) {
    speak(lastResponse);
  }
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
    battery.addEventListener('levelchange', updateBattery);
    updateBattery();
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
