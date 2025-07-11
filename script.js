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
  } else {
    response = "I'm sorry sir, I didn't catch that.";
  }

  output.innerHTML += "<br>Jarvis: " + response;
  speak(response);
}

function speak(message) {
  const speech = new SpeechSynthesisUtterance(message);
  speech.lang = "en-GB"; // British voice
  speech.pitch = 1;
  speech.rate = 1;
  window.speechSynthesis.speak(speech);
}