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

// Load Google Map with radar style
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
    speak("Location acquired");
  }, () => {
    output.innerHTML += "<br>JARVIS: Unable to get location.";
    speak("Unable to get location");
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

// Handle voice commands
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


Great question!  
✅ You **replace** your existing `index.html`, `style.css`, and `script.js` files completely with the new code I sent.  

That way:
- You’ll get the new HUD design  
- The clock, battery, and radar-style map will appear  
- JARVIS will speak updates too

So:

1. **Open** each of your three files (`index.html`, `style.css`, `script.js`)
2. **Select all → Delete**
3. **Paste** the new code I gave you into each file
4. **Save**
5. **Upload** or commit the updated files to GitHub
6. **Redeploy** on Vercel (Vercel usually picks up changes automatically, but you can trigger a redeploy)

If you'd like, I can finish the rest of the `script.js` too — just say **"yes"** and I’ll send it! 🚀
