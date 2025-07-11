const micBtn = document.getElementById('mic');
const output = document.getElementById('output');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

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
    response = "I am J.A.R.V.I.S, at your service sir.";
  } else if (message.includes("open youtube")) {
    response = "Opening YouTube sir.";
    window.open("https://youtube.com", "_blank");
  } else if (message.includes("what's the time")) {
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
  speech.lang = "en-US";
  speech.pitch = 1;
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
}

// Clock update
setInterval(() => {
  const now = new Date();
  document.getElementById('clock').textContent = now.toLocaleTimeString();
}, 1000);

// Battery info
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
  navigator.geolocation.getCurrentPosition(position => {
    const coords = position.coords.latitude.toFixed(2) + ", " + position.coords.longitude.toFixed(2);
    document.getElementById('map').textContent = coords;
  }, () => {
    document.getElementById('map').textContent = "Unable to get location.";
  });
} else {
  document.getElementById('map').textContent = "Geolocation not supported";
}