
const micBtn = document.getElementById('mic');
const output = document.getElementById('output');
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = false;
let lastResponse = "";

micBtn.addEventListener('click', () => {
  recognition.start();
  output.innerHTML = "Listening...";
});

recognition.onresult = (e) => {
  const transcript = e.results[0][0].transcript.toLowerCase();
  output.innerHTML = "You said: " + transcript;
  let response = "";
  if (transcript.includes("open arc reactor project")) {
    response = "Opening Arc Reactor project, sir.";
    window.open("arc-reactor.html", "_blank");
  } else if (transcript.includes("hello")) {
    response = "Hello sir.";
  } else {
    response = "I'm sorry sir, I didn't catch that.";
  }
  output.innerHTML += "<br>Jarvis: " + response;
  speak(response);
  lastResponse = response;
};

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "en-US";
  utter.pitch = 1; utter.rate = 1;
  window.speechSynthesis.speak(utter);
}

// Clock
setInterval(() => {
  document.getElementById('clock').textContent = new Date().toLocaleTimeString();
}, 1000);

// Battery
if ('getBattery' in navigator) {
  navigator.getBattery().then(battery => {
    function update() {
      document.getElementById('battery').textContent = Math.round(battery.level * 100) + "%";
    }
    update();
    battery.addEventListener('levelchange', update);
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
