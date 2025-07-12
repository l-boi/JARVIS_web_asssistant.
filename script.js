const micBtn = document.getElementById('mic');
const output = document.getElementById('output');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';

recognition.onstart = () => {
  output.innerHTML = "Listening...";
};

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript.toLowerCase();
  output.innerHTML = "You said: " + transcript;
  reply(transcript);
};

recognition.onerror = (event) => {
  console.error("Recognition error:", event.error);
};

micBtn.addEventListener('click', () => {
  recognition.start();
});

function reply(message) {
  let response = "";

  if (message.includes("hello")) {
    response = "Hello sir.";
  } else if (message.includes("who are you")) {
    response = "I am JARVIS, your personal assistant.";
  } else if (message.includes("open youtube")) {
    response = "Opening YouTube sir.";
    window.open("https://youtube.com", "_blank");
  } else if (message.includes("what's the time") || message.includes("what is the time")) {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    response = "The current time is " + timeString;
  } else if (message.includes("open arc reactor project")) {
    response = "Opening arc reactor project.";
    window.open("arc-reactor.html", "_blank");
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
