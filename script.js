
// Simple recognition demo
const micBtn = document.getElementById('mic');
const output = document.getElementById('output');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

micBtn.addEventListener('click', () => {
  recognition.start();
});

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript.toLowerCase();
  output.textContent = "You said: " + transcript;
  if (transcript.includes("open arc reactor project")) {
    window.location.href = "arc-reactor.html";
  } else {
    output.textContent += "\nJarvis: I'm sorry sir, I didn't catch that.";
  }
};
