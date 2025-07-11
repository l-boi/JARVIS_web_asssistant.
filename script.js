const output = document.getElementById('output');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true; // keep listening
recognition.interimResults = false;

let isAwaitingCommand = false;

recognition.onstart = () => {
  output.innerHTML += "<br>Listening for wake word...";
};

recognition.onresult = (event) => {
  const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
  output.innerHTML += "<br>You said: " + transcript;

  if (!isAwaitingCommand) {
    if (transcript.includes("jarvis")) {
      output.innerHTML += "<br>Wake word detected! Listening for command...";
      isAwaitingCommand = true;
    }
  } else {
    reply(transcript);
    isAwaitingCommand = false;
  }
};

recognition.onerror = (event) => {
  console.error("Recognition error:", event.error);
};

recognition.onend = () => {
  recognition.start(); // restart automatically if it stops
};

// Start listening immediately
recognition.start();

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
  speech.lang = "en-GB"; // British accent
  speech.pitch = 1;
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
}
